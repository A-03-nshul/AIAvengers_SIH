//src/components/Navbar.jsx
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { user, setUser } = useContext(UserContext); // Destructure 'user' and 'setUser' from the context value
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); // Clear user from context
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Logout error:", err);
      // Handle error if needed
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" aria-label="Home">
          Traffic Management
        </Link>

        <div className="navbar-nav ms-auto">
          {user ? (
            <>
              <span className="nav-link">Welcome, {user.username}!</span>
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                <b>Logout</b>
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/register">
                <b>Sign Up</b>
              </Link>
              <Link className="nav-link" to="/login">
                <b>Login</b>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
