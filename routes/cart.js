const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/cart");

// ======================
// GET CART
// ======================
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ======================
// ADD TO CART
// ======================
router.post("/add", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, price, qty } = req.body;

    let item = await Cart.findOne({ userId, name });

    if (item) {
      item.qty += qty || 1;
      await item.save();
    } else {
      item = await Cart.create({
        userId,
        name,
        price,
        qty: qty || 1,
      });
    }

    const cart = await Cart.find({ userId });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// REMOVE FROM CART (FIXED)
// ======================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Cart.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    const cart = await Cart.find({ userId: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;