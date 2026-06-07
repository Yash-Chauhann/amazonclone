const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Cart = require("../models/cart");
const auth = require("../middleware/auth");

// ======================
// PLACE ORDER (FINAL FIX)
// ======================
router.post("/place", auth, async (req, res) => {
  try {
    const userId = req.user?.id;

    // ✅ CHECK USER
    if (!userId) {
      return res.status(401).json({ error: "Invalid token or user not found" });
    }

    // ✅ GET CART
    const cartItems = await Cart.find({ userId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart empty" });
    }

    // ✅ CALCULATE TOTAL SAFELY
    let total = 0;

    cartItems.forEach((item) => {
      const price = item.price || 0;
      const qty = item.qty || 1;
      total += price * qty;
    });

    // ✅ CREATE ORDER
    const order = await Order.create({
      userId,
      items: cartItems,
      totalAmount: total,
    });
  router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
    // ✅ CLEAR CART
    await Cart.deleteMany({ userId });

    res.json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
});

module.exports = router;