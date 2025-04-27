const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 7,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(423).json({
            success: false,
            message: 'Вы слишком часто выполняете действия. Подождите немного и попробуйте снова.',
        });
    },
});

module.exports = apiLimiter;