const productDetails = require('../models/productDetailes');
const moyskladService = require('../services/moyskladService');
const User = require('../models/user');

// Search for products
const searchProducts = async (req, res) => {
    try {
        const { term, limit, offset } = req.query;
        
        // Get products from Moysklad
        const searchResult = await moyskladService.searchProducts(term, limit, offset);
        
        // Get ratings from database
        const matchedProductRatings = await productDetails.find({
            productId: searchResult.products.map(product => product.id)
        });
        
        // Combine product data with ratings
        const combinedData = searchResult.products.map(product => {
            const matchingProduct = matchedProductRatings.find(
                rating => rating.productId === product.id
            );

            return {
                ...product, 
                ratingsFromDatabase: matchingProduct ? matchingProduct.productRating : []
            };
        });

        return res.status(200).json({...searchResult, products: combinedData});
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({error: 'Ошибка API MoySklad'});
    }
};

// Get product details by ID
const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        // Get product from Moysklad
        const product = await moyskladService.getProductById(productId);
        
        // Get product comments from database
        const productComments = await productDetails.find({productId: productId});
        const productCommentsData = productComments.map(comment => comment.productRating).flat();

        // Limit comments to 10
        if (productCommentsData.length > 10) {
            productCommentsData.slice(0, 10);
        }

        res.status(200).json({
            product: {
                ...product,
                productComments: productCommentsData
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({error: 'Ошибка API MoySklad'});
    }
};

// Get multiple products by IDs
const getProductsBatch = async (req, res) => {
    try {
        const { productIds } = req.body;
        
        // Get products from Moysklad
        const products = await moyskladService.getProductsByBatchIds(productIds);
        
        // Get ratings from database
        const productRatings = await productDetails.find({
            productId: products.map(product => product.id)
        });

        // Combine product data with ratings
        const combinedData = products.map(product => {
            const matchingProduct = productRatings.find(
                rating => rating.productId === product.id
            );

            return {
                ...product,
                ratingsFromDatabase: matchingProduct ? matchingProduct.productRating : []
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: 'Ошибка API MoySklad' });
    }
};

// Add or update product rating
const rateProduct = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const product = await productDetails.findOne({productId});

        if (!product) {
            const newProduct = new productDetails({
                productId: productId, 
                productRating: [{
                    userId: user.id, 
                    userName: user.name, 
                    rating: rating, 
                    comment: comment, 
                    date: Date.now()
                }]
            });
            await newProduct.save();
            return res.status(200).json({message: 'Оценка успешно добавлена'});
        }

        product.productRating.push({
            userId: user.id, 
            userName: user.name, 
            rating: rating, 
            comment: comment, 
            date: Date.now()
        });
        await product.save();

        return res.status(200).json({message: 'Оценка успешно добавлена'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
};

// Delete product rating
const deleteRating = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const product = await productDetails.findOne({productId});

        if (!product) {
            return res.status(404).json({message: 'Продукт не найден'});
        }

        product.productRating = product.productRating.filter(
            comment => comment.userId !== user.id
        );
        await product.save();

        return res.status(200).json({message: 'Оценка успешно удалена'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
};

const getTopTenProducts = async (req, res) => {
    try {
        const topTenProducts = await productDetails.find().sort({timesOrdered: -1}).limit(10);
        const productIds = topTenProducts.map(product => product.productId);
        
        // Get products from Moysklad and filter out any that failed to load

        if (productIds.length >= 5) {
            const products = await moyskladService.getProductsByBatchIds(productIds);
            const validProducts = products.filter(product => product !== null);
        
            // Combine product data with ratings
            const combinedData = validProducts.map(product => {
            const matchingProduct = topTenProducts.find(
                rating => rating.productId === product.id
            );

                return {
                    ...product,
                    ratingsFromDatabase: matchingProduct ? matchingProduct.productRating : []
                };
            });

            return res.status(200).json(combinedData);
        } else {
            return res.status(200).json([])
        }
        
    } catch (error) {
        console.error("Error fetching top ten products:", error);
        res.status(500).json({ error: 'Ошибка при получении топ-10 продуктов' });
    }
};


module.exports = {
    searchProducts,
    getProductById,
    getProductsBatch,
    rateProduct,
    deleteRating,
    getTopTenProducts
};