import axios from "axios";
import { useCart } from "./context/CartContext";

function Checkout() {
  const { cart, getTotalPrice } = useCart();

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);
      console.log("CART:", cart);

      if (!token || token === "undefined") {
        alert("Please login first");
        return;
      }

      if (!cart || cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      const res = await axios.post(
        "https://amazonclone-htzt.onrender.com/orders/place", // ⚠️ confirm backend route
        {
          items: cart,
          total: Number(getTotalPrice()) || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER RESPONSE:", res.data);

      alert("Order Placed Successfully 🎉");
    } catch (err) {
      console.log("ORDER ERROR:", err.response?.data || err.message);
      alert("Order Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <h3>Total: ₹{Number(getTotalPrice()) || 0}</h3>

      <button
        onClick={placeOrder}
        style={{
          background: "green",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Place Order 🛒
      </button>

      <div style={{ marginTop: "20px" }}>
        {cart.map((item, i) => (
          <div key={i}>
            {item.name} - ₹{Number(item.price) || 0} x {item.qty || 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkout;