const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const TelegramBot = require('./config/telegramBot');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const frontendUrl = process.env.FRONTEND_URL;


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: frontendUrl, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}));


// Routes
app.get('/', (req, res) => {
    res.send('Сервер Gold Perfume.');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const port = process.env.PORT || 4004;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
