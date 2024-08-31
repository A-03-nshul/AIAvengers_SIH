//context/userContent.jsx
import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:3001/user", { withCredentials: true })
        .then(({ data }) => setUser(data))
        .catch((err) => console.error("Failed to fetch user data:", err));
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Adding propTypes to validate the 'children' prop
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
