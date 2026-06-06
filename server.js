const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// routes
const cartRoutes = require("./routes/cart");
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const connectDB = require("./db");

connectDB();
console.log(__dirname);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const orderRoutes = require("./routes/order");

app.use("/order", orderRoutes);

console.log("MONGO URL:", process.env.MONGO_URL);
