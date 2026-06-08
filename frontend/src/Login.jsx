import { useState } from "react";
import axios from "axios";

// 🔥 API BASE (IMPORTANT)
const API_BASE = "https://amazonclone-htzt.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/auth/login`,
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token;

      // ✅ SAFE CHECK
      if (!token) {
        alert("Token not received from backend");
        return;
      }

      localStorage.setItem("token", token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      alert("Login Successful 🎉");
    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;