const express = require('express');
const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { checkAuth } = require('../middleware/auth');


router.post('/add-to-favourite', checkAuth, cartController.addToFavourite);
router.post('/add-to-cart', checkAuth, cartController.addToCart);
router.put('/update-cart', checkAuth, cartController.updateCart);
router.put('/delete-from-cart', checkAuth, cartController.deleteFromCart);
router.post('/checkout', checkAuth, cartController.checkout);
router.post('/update-order-status', cartController.updateOrderStatus);


module.exports = router;