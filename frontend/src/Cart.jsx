import { useCart } from "./context/CartContext";

function Cart() {
  const { cart, removeFromCart, removeOne, addToCart } = useCart();

  // SAFE TOTAL CALC (no NaN ever)
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item?.price || 0);
    const qty = item?.quantity || 1;
    return sum + (Number.isFinite(price) ? price * qty : 0);
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧾 Your Cart</h1>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => {
            const price = parseFloat(item?.price || 0);
            const qty = item?.quantity || 1;

            return (
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

                  <p>Qty: {qty}</p>

                  <button onClick={() => removeOne(item._id)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>

                  <p>₹{Number.isFinite(price) ? price * qty : 0}</p>
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
            );
          })}

          <h2 style={{ marginTop: "20px" }}>
            Total Price: ₹{Number.isFinite(total) ? total : 0}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;