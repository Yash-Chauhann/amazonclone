const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Cart = require("../models/cart");
const auth = require("../middleware/auth");

// PLACE ORDER
router.post("/place", auth, async (req, res) => {

    const userId = req.user.id;

    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
        return res.json({ error: "Cart empty" });
    }

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.qty;
    });

    const order = await Order.create({
        userId,
        items: cartItems,
        totalAmount: total
    });

    // clear cart after order
    await Cart.deleteMany({ userId });

    res.json({
        message: "Order placed successfully",
        order
    });
});

module.exports = router;