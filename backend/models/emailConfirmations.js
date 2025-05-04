const mongoose = require('mongoose');


const confirmationsEmailSchema = new mongoose.Schema({
    email: {type: String, required: true},
    token: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour
    }
})

const EmailConfirmations = mongoose.model('EmailConfirmations', confirmationsEmailSchema);

module.exports = EmailConfirmations;