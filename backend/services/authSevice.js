const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const generateAccessToken = (userId) => {
    return jwt.sign({ user: userId }, jwtSecretKey, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ user: userId }, jwtSecretKey, { expiresIn: '31d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecretKey);
}

const generateResetToken = (email) => {
    return jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    generateResetToken,
    hashPassword,
    comparePassword
};