import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
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

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        password,
      });
      setMessage(res.data.message);
      setIsSuccess(true);
      setShowPopup(true);
       setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      setIsSuccess(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    }
  };

  return (
    <div className="register-container">
       <Popup
        message={showPopup ? message : ""}
        type={isSuccess ? "success" : "error"}
        onClose={() => setShowPopup(false)}
      />
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="title">Create Account ✨</h2>

        {message && (
          <p className={isSuccess ? "success-text" : "error-text"}>{message}</p>
        )}

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">Register</button>
        <p className="footer-text">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
