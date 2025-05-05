const User = require('../models/user');
const { sendOrderToTelegram } = require('../services/telegramService');
const emailService = require('../services/emailService');
const ProductDetails = require('../models/productDetailes');
const saveProductsStatistics = require('../utils/saveProductsStatistics');
const returnSafeUserData = require('../utils/returnSafeUserData');


const addToFavourite =  async (req, res) => {
    
    const {itemId} = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        if (user.favourites.includes(itemId)) {

            user.favourites = user.favourites.filter(fav => fav !== itemId)
            await user.save();
            return res.status(200).json({message: 'Удалено из избранного', favourites: user.favourites});
        }
        user.favourites.push(itemId);
        await user.save();

        res.status(200).json({message: 'Товар добавлен в избранное', favourites: user.favourites});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Внутренняя ошибка сервера'});
    
    }
}


const addToCart = async (req, res) => {
    
    const {itemId, quantity} = req.body;

    if (!itemId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await User.findById(req.userId);
        const userHasItem = user.cart.some(item => item.itemId === itemId)

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        if (userHasItem) {

            user.cart = user.cart.map(item => item.itemId === itemId ? {...item, quantity: item.quantity + quantity} : item)
            
            await user.save();
            return res.status(200).json({cart: user.cart});
        }
        
        user.cart.push({itemId, quantity: quantity})
        await user.save();

        res.status(200).json({message: 'Товар добавлен в корзину', cart: user.cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Внутренняя ошибка сервера'});
    
    }
}

const updateCart = async (req, res) => {

    const { itemId, quantity } = req.body;

    if (!itemId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }

        const itemIndex = user.cart.findIndex(item => item.itemId === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Товар не найден в базе данных' });
        }

        if (quantity > 0) {
            user.cart[itemIndex].quantity = quantity;
        } else {
            user.cart = user.cart.filter(item => item.itemId !== itemId);
        }

        await user.save();
        return res.status(200).json({message: 'Обновлено', cart: user.cart}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
}

const deleteFromCart = async (req, res) => {
    
    const {itemId} = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }

        const itemIndex = user.cart.findIndex(item => item.itemId === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Товар не найден в базе данных' });
        }

        user.cart = user.cart.filter(item => item.itemId !== itemId);
        await user.save();
        res.status(200).json({message: 'Товар удален из корзины', cart: user.cart})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
}

const checkout = async (req, res) => {

    const {orderForm} = req.body;

    if (!orderForm) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }
        
        
        const productsOrdered = orderForm.products.map(product => product.itemId);
       

        user.cart = [];
        user.orders.push({
              orderId: orderForm.orderId,
              orderTotal: orderForm.orderTotal,
              products: orderForm.products,
              date: orderForm.date,
              totalItems: orderForm.totalItems
        }); 

        await user.save();
        await saveProductsStatistics(productsOrdered);
        await sendOrderToTelegram(orderForm);
        await emailService.sendOrderConfirmationEmail(orderForm);

        res.status(200).json({message: 'Заказ успешно размещен',  user: returnSafeUserData(user),})


    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
        console.log(error)
    }
}

const updateOrderStatus = async (req, res) => {
    const {orderId, action} = req.body;

    try {
        const user = await User.findOne({'orders.orderId': orderId});

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }

        const userOrder = user.orders.find(order => order.orderId === orderId);

        if (!userOrder) {
            return res.status(404).json({ message: 'Заказ не найден!' }); 
        }

        const order = user.orders.find(order => order.orderId === orderId);

        userOrder.status = action;

        await user.save();
        
        if (action === 'confirmed' || action === 'canceled') {
            await emailService.sendOrderStatusUpdateEmail({
                order:userOrder, 
                name: user.name,
                email: user.email, 
                status:action
            })
        }
        

        res.status(200).json({message: 'Статус заказа обновлен'})

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
        console.log(error)
    }
}



module.exports = {
    addToFavourite,
    addToCart,
    updateCart,
    deleteFromCart,
    updateOrderStatus,
    checkout
}