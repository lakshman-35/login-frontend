import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/dashboard" element={
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a18cd1, #fbc2eb, #fad0c4)",
      backgroundSize: "400% 400%",
      animation: "gradientBG 10s ease infinite",
    }}
  >
    <h1
      style={{
        fontSize: "4rem",
        fontWeight: "bold",
        background: "linear-gradient(90deg, #ff6a00, #ee0979, #00c9ff, #92fe9d)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "gradientText 5s linear infinite",
      }}
    >
      Welcome to Dashboard 🎉
    </h1>

    <style>
      {`
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>
  </div>
}
 />
      </Routes>
    </Router>
  );
}

export default App;
