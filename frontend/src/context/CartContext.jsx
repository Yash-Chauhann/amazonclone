import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const API = "https://amazonclone-htzt.onrender.com";

  // ✅ SAFE TOKEN GETTER
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      console.log("❌ No valid token found");
      return null;
    }
    return token;
  };

  // ======================
  // FETCH CART
  // ======================
  const fetchCart = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await axios.get(`${API}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.cart || res.data || []);
    } catch (err) {
      console.log("Fetch Cart Error:", err.response?.data || err.message);
    }
  };

  // ======================
  // ADD TO CART
  // ======================
  const addToCart = async (product) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        `${API}/cart/add`,
        {
          name: product.name,
          price: product.price,
          qty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart || res.data || []);
    } catch (err) {
      console.log("Add To Cart Error:", err.response?.data || err.message);
    }
  };

  // ======================
  // REMOVE ONE
  // ======================
  const removeOne = async (id) => {
    try {
      const token = getToken();
      if (!token) return;

      await axios.delete(`${API}/cart/decrease${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.log(err.message);
    }
  };

  // ======================
  // REMOVE ALL
  // ======================
  // REMOVE ALL
const removeFromCart = async (id) => {
  try {
    const token = getToken();
    if (!token) return;

    await axios.delete(`${API}/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();
  } catch (err) {
    console.log(err.message);
  }
};

  // ======================
  // TOTAL PRICE
  // ======================
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  // ======================
  // AUTO LOAD CART
  // ======================
  useEffect(() => {
    const token = getToken();
    if (token) fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeOne,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);