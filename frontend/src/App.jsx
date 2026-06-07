import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./context/CartContext";
import Cart from "./Cart";
function App() {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
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

  return showCart ? (
  <Cart />
) : (
  <div style={{ padding: "20px" }}>
    <h1>Amazon Clone</h1>

    <button onClick={() => setShowCart(!showCart)}>
      Go to Cart 🛒
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
