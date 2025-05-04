const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimiter = require('../middleware/rateLimiter');
const { checkRefreshToken, checkAuth } = require('../middleware/auth');

router.post('/register', authController.register); //ratelimit
router.post('/login', authController.login); //ratelimit
router.get('/refresh-token', checkRefreshToken, authController.refreshToken);
router.post('/reset-password', authController.requestPasswordReset);
router.post('/reset-password/confirm', authController.confirmPasswordReset);
router.post('/request-email-confirm-link', authController.requestEmailConfirmation);
router.post('/confirm-email-verification', authController.confirmEmailVerification)
router.post('/logout', authController.logout);
router.post('/update-password', checkAuth, authController.updatePassword); //ratelimit

module.exports = router;