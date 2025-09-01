import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Popup({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`popup ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      setMessage(res.data.message);
      setIsSuccess(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
      setIsSuccess(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    }
  };

  return (
    <div className="login-container">
      <Popup
        message={showPopup ? message : ""}
        type={isSuccess ? "success" : "error"}
        onClose={() => setShowPopup(false)}
      />
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="title">Welcome Back 👋</h2>

        {message && (
          <p className={isSuccess ? "success-text" : "error-text"}>{message}</p>
        )}

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">Login</button>
        <p className="footer-text">
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
