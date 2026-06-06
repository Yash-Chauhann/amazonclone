require("dotenv").config();
console.log("ENV TEST:", process.env.MONGO_URL);
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

import cors from "cors"

app.use(cors({
  origin: "*"
}))

// DB CONNECT (yahin direct)

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err.message));

const PORT = 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("MONGO URL:", process.env.MONGO_URL);
console.log(__dirname);