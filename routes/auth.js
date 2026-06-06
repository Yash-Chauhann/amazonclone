const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.json({ message: "User created" });
});

// LOGIN (REAL)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.json({ error: "Wrong password" });
    }

    const token = jwt.sign(
        { id: user._id },
        "secretkey",
        { expiresIn: "1d" }
    );

    res.json({ token });
});

module.exports = router;