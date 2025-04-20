const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telephone: {type: String, default: ''},

  addresses: [{ type: String }],
  orders: [{ type: String }],
  favourites: [{ type: String }],

  cart: [
    {
      itemId: { type: String},
      quantity: { type: Number}
    }
  ],

  passwordReset: {
    resetToken: { type: String, default: null },
    resetTokenExpiration: { type: Date, default: null },
    resetTokenUsed: { type: Boolean, default: false },
    resetTokenCreatedAt: { type: Date, default: null },
  }
});


const User = mongoose.model('User', userSchema);
module.exports = User;