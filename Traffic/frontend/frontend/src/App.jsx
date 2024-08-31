// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import { UserContextProvider } from "../context/userContext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* Protect the Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Optionally protect the root path */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
