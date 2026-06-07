import { useCart } from "./context/CartContext";

function Checkout() {
  const { cart, getTotalPrice } = useCart();

  const placeOrder = () => {
    alert("Order Placed Successfully 🎉");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧾 Checkout</h1>

      {cart.length === 0 ? (
        <h3>No items to checkout</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} style={{ marginBottom: "10px" }}>
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}

          <h2>Total: ₹{getTotalPrice()}</h2>

          <button
            onClick={placeOrder}
            style={{
              background: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;