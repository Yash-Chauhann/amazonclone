import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./context/CartContext";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
function App() {
   const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
 
  const [showCheckout, setShowCheckout] = useState(false);
   const { addToCart, cart } = useCart(); 

  useEffect(() => {
    axios
      .get("https://amazonclone-htzt.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

 return showLogin ? (
  <Login />
) : showCheckout ? (
  <Checkout />
) : showCart ? (
  <Cart />
) : (
  <div style={{ padding: "20px" }}>
    <h1>Amazon Clone</h1>

    <button onClick={() => setShowLogin(true)}>
      Login 🔐
    </button>

    <button onClick={() => setShowCart(!showCart)}>
      Cart 🛒
    </button>

    <button onClick={() => setShowCheckout(true)}>
      Checkout 💳
    </button>

    <h2>Cart Items: {cart.length}</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);}
export default App;
