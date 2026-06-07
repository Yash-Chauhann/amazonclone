import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const API = "https://amazonclone-htzt.onrender.com";

  // ======================
  // SAFE TOKEN GETTER
  // ======================
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("❌ No token found - user not logged in");
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
      console.log(
        "Fetch cart error:",
        err.response?.data || err.message
      );
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
      console.log(
        "Add to cart error:",
        err.response?.data || err.message
      );
    }
  };

  // ======================
  // REMOVE ONE ITEM
  // ======================
  const removeOne = async (id) => {
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
      console.log("Remove one error:", err.message);
    }
  };

  // ======================
  // REMOVE FROM CART
  // ======================
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
      console.log("Remove error:", err.message);
    }
  };

  // ======================
  // TOTAL PRICE
  // ======================
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
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