const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const generateAccessToken = (userId) => {
    return jwt.sign({ user: userId }, jwtSecretKey, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ user: userId }, jwtSecretKey, { expiresIn: '31d' });
};

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
    generateResetToken,
    hashPassword,
    comparePassword
};