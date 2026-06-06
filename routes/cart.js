const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./cart.json";

// helper: read data
function readCart() {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
}

// helper: write data
function writeCart(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET cart


router.get("/", async (req, res) => {
    const cart = await Cart.find();
    res.json(cart);
});

// ADD item
router.post("/add", auth, async (req, res) => {

    try {

        if (!req.user) {
            return res.status(401).json({ error: "User not found" });
        }
      console.log("TOKEN:", req.headers.authorization);
    console.log("USER:", req.user);
        const userId = req.user.id;

        const { name, price, qty } = req.body;

        const existing = await Cart.findOne({ name, userId });

        if (existing) {
            existing.qty += qty || 1;
            await existing.save();
        } else {
            await Cart.create({
                name,
                price,
                qty: qty || 1,
                userId
            });
        }

        const cart = await Cart.find({ userId });

        res.json(cart);

    } catch (err) {
        console.log("Cart Error:", err);
        res.status(500).json({ error: "Server crash" });
    }
});



// REMOVE item
router.post("/remove", async (req, res) => {
    const { name } = req.body;

    await Cart.deleteOne({ name });

    const cart = await Cart.find();
    res.json(cart);
});

module.exports = router;