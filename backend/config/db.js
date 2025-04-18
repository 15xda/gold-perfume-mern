const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connection to MongoDB is established!')
    } catch (error) {
        console.log('Error Occured while connecting to MongoDB: ', error)
    }
}


module.exports = connectDB;