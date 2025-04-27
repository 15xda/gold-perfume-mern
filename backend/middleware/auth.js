const jwt = require('jsonwebtoken');

// Environment variables
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Требуется авторизация' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.userId = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Недействительный токен' });
    }
};

const checkRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ message: "Токен обновления не обнаружен." });
    }

    jwt.verify(refreshToken, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Недействительный токен обновления." });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { 
    checkAuth,
    checkRefreshToken
};