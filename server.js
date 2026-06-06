require("dotenv").config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ ONLY ONE CORS (FIXED)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// DB CONNECT
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err.message));

// routes
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("MONGO URL:", process.env.MONGO_URL);