const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
  
    email: { type: String, required: true, unique: true },
  
    password: { type: String, required: true }, 

    favourites: [ { type: String, required: true } ],

    cart: [
      {
        itemId: { type: String, required: true },
        quantity: { type: Number, required: true}
      }
    ],

    passwordReset: {
      resetToken: { type: String, default: null, },
      resetTokenExpiration: { type: Date, default: null },
      resetTokenUsed: { type: Boolean, default: false },
      resetTokenCreatedAt: { type: Date, default: null },
    }
  
  });

const User = mongoose.model('User', userSchema);
module.exports = User;