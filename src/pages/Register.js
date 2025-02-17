import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", { fullName, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        minHeight: "100vh",
      }}
    >
      <div
        className="p-4 shadow-lg rounded-4 text-center"
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="fw-bold text-primary mb-3">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3 text-start">
            <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "6px",
              fontWeight: "bold",
              padding: "10px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Register
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <a href="/login" className="text-primary fw-bold" style={{ textDecoration: "none" }}>Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Register;