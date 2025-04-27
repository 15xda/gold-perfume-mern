const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkAuth } = require('../middleware/auth');

// Product routes
router.get('/search', productController.searchProducts);
router.get('/:productId', productController.getProductById);
router.post('/batch', productController.getProductsBatch);
router.post('/rating', checkAuth, productController.rateProduct);
router.post('/delete-rating', checkAuth, productController.deleteRating);

module.exports = router;