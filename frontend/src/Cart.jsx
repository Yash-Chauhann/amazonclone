import { useCart } from "./context/CartContext";

function Cart() {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧾 Your Cart</h1>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "10px",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* ✅ ONLY ONCE (OUTSIDE MAP) */}
          <h2 style={{ marginTop: "20px" }}>
            Total Price: ₹{getTotalPrice()}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;