const mongoose = require("mongoose");


const productDetailsSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productRating: [
    { 
      userId: { type: String, required: true },
      userName: { type: String, required: true },
      rating: {type: Number, required: true},
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now },
    }
  ],
});

const ProductDetails = mongoose.model("ProductDetails", productDetailsSchema);

module.exports = ProductDetails;