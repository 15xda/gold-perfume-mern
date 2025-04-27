const express = require('express');
const router = require('express').Router();
const {checkAuth} = require('../middleware/auth');
const userController = require('../controllers/userController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/update-user-info', rateLimiter, checkAuth, userController.updateUserInfo);
router.post('/add-address', checkAuth, userController.addAddress);
router.post('/delete-address', checkAuth, userController.deleteAddress);


module.exports = router;