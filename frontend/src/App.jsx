import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

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

  return (
  <div style={{ padding: "20px" }}>
    <h1>Amazon Clone</h1>

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
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={
              product.image ||
              "https://via.placeholder.com/200x200?text=Product"
            }
            alt={product.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />

          <h3>{product.name}</h3>

          <p>
            <strong>₹{product.price}</strong>
          </p>

          <p>{product.category}</p>

          <p>{product.description}</p>

          <button
            style={{
              width: "100%",
              padding: "10px",
              background: "#ffd814",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);}
export default App;
