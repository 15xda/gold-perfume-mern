const productDetailes = require('../models/productDetailes');


const saveProductsStatistics = async (productIds = []) => {
    for (const id of productIds) {
        const product = await productDetailes.findOne({productId: id})

        if (!product) {
            const newProduct = new productDetailes({
                productId: id,
                timesOrdered: 1,
            });
            await newProduct.save();
        } else {
            product.timesOrdered += 1;
            await product.save();
        }
    }
}

module.exports = saveProductsStatistics;