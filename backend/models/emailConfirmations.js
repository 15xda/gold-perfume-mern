const mongoose = require('mongoose');


const confirmationsEmailSchema = new mongoose.Schema({
    email: {type: String, required: true},
    token: {type: String, required: true},
    used: {
        type: Boolean,
        default: false
    },
    usedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour
    }
})

const EmailConfirmations = mongoose.model('EmailConfirmations', confirmationsEmailSchema);

module.exports = EmailConfirmations;