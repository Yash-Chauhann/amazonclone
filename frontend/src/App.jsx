import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./context/CartContext";

import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import MyOrders from "./pages/MyOrders";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [products, setProducts] = useState([]);

  const { addToCart, cart } = useCart();

  // ======================
  // FETCH PRODUCTS
  // ======================
  useEffect(() => {
    axios
      .get("https://amazonclone-htzt.onrender.com/api/products")
      .then((res) => {
        console.log("PRODUCT API RESPONSE:", res.data);
        setProducts(res.data || []);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // ======================
  // UI FLOW CONTROL
  // ======================
  if (showLogin) return <Login />;
  if (showCheckout) return <Checkout />;
  if (showCart) return <Cart />;
  if (showOrders) return <MyOrders />;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Amazon Clone</h1>

      {/* NAV BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShowLogin(true)}>Login 🔐</button>

        <button onClick={() => setShowCart(true)}>
          Cart 🛒 ({cart.length})
        </button>

        <button onClick={() => setShowCheckout(true)}>
          Checkout 💳
        </button>

        <button onClick={() => setShowOrders(true)}>
          My Orders 📦
        </button>
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>{product.name || "No Name"}</h3>

            {/* ✅ FIXED PRICE (NO NaN ISSUE) */}
           const price = Number(product.price);

<p>₹{isNaN(price) ? 0 : price}</p>

            <button
              onClick={() => addToCart(product)}
              style={{
                background: "#ffd814",
                border: "none",
                padding: "8px 12px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;