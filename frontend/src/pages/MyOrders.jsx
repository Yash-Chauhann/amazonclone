import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://amazonclone-htzt.onrender.com/order/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>Order ID: {order._id}</h3>
            <p>Total: ₹{order.totalAmount}</p>

            <h4>Items:</h4>
            {order.items.map((item, index) => (
              <div key={index}>
                <p>
                  {item.name} - ₹{item.price} × {item.qty}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;