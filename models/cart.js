const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    qty: Number,
      userId: String 
});

module.exports = mongoose.model("Cart", cartSchema);