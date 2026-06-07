import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ======================
  // FETCH CART
  // ======================
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://amazonclone-htzt.onrender.com/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCart(res.data);
  };

  // ======================
  // ADD TO CART (BACKEND)
  // ======================
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://amazonclone-htzt.onrender.com/cart/add",
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

    setCart(res.data);
  };

  // ======================
  // REMOVE ONE ITEM
  // ======================
  const removeOne = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://amazonclone-htzt.onrender.com/cart/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCart();
  };

  // ======================
  // REMOVE FROM CART
  // ======================
  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://amazonclone-htzt.onrender.com/cart/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCart();
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
    fetchCart();
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