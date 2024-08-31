//components/NodeDropdown.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function NodeDropdown() {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");
  const { user, error } = useContext(UserContext);

  useEffect(() => {
    const fetchNodes = async () => {
      if (user) {
        // Log the entire user object and the locality
        console.log("User object:", user);
        console.log("Locality from user:", user.locality);

        const localityName =
          typeof user.locality === "object" && user.locality.name
            ? user.locality.name
            : user.locality;

        console.log("Final Locality name:", localityName);

        if (!localityName) {
          console.error("Locality name is undefined or empty.");
          return;
        }

        try {
          const response = await axios.get(
            `http://localhost:3001/api/traffic/locality/${encodeURIComponent(
              localityName
            )}/nodes`,
            { withCredentials: true }
          );
          setNodes(response.data);
        } catch (err) {
          console.error(
            "Error fetching nodes:",
            err.response?.data || err.message
          );
        }
      } else if (error) {
        console.error("Error from context:", error);
      }
    };

    fetchNodes();
  }, [user, error]);

  const handleNodeChange = (e) => {
    setSelectedNode(e.target.value);
  };

  return (
    <div>
      <label htmlFor="nodeDropdown"></label>
      <select
        id="nodeDropdown"
        value={selectedNode}
        onChange={handleNodeChange}
        className="form-select"
      >
        <option value="">Select a node</option>
        {nodes.length > 0 ? (
          nodes.map((node) => (
            <option key={node._id} value={node._id}>
              {node.name}
            </option>
          ))
        ) : (
          <option disabled>No nodes available</option>
        )}
      </select>
    </div>
  );
}

export default NodeDropdown;
