//src/components/Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext"; // Import the UserContext

function Login() {
  const [username, setUsername] = useState(""); // Change to 'username'
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from context

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        { username, password }, // Send 'username' instead of 'email'
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      if (response.data.message === "Login successful") {
        // Update user context
        setUser(response.data.user); // Assuming the API returns user data
        navigate("/dashboard");
      } else {
        alert("Login failed: " + response.data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(
        "An error occurred: " +
          (err.response ? err.response.data.error : err.message)
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Login</center>
        </h2>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              autoComplete="off"
              name="username"
              className="form-control rounded-0"
              value={username} // Change from 'email' to 'username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Don&apos;t have an account?</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;

