// // import ThreeScene from "../ThreeScene"; // Adjust the path if necessary

// function Dashboard() {
//   const options = [
//     { value: "Kothrud", label: "Kothrud" },
//     { value: "Shivajinagar", label: "Shivajinagar" },
//     { value: "Katraj", label: "Katraj" },
//     { value: "Swargate", label: "Swargate" },
//     { value: "Hadapsar", label: "Hadapsar" },
//   ];

//   return (
//     <div
//       className="  d-flex flex-column justify-content-center align-items-center"
//       style={{
//         height: "100vh", // Takes full height of the viewport
//       }}
//     >
//       {/* Replace the first div with the ThreeScene component */}
//       <div
//         className="bg-black d-flex flex-column justify-content-center align-items-center mb-4"
//         style={{
//           width: "70%",
//           height: "70%", // Adjusted height to ensure it fits well
//         }}
//       >
//         <h1>hiii</h1>
//         {/* <ThreeScene /> */}
//       </div>

//       <div
//         className="d-flex flex-column justify-content-center align-items-center"
//         style={{
//           width: "70%",
//           color: "black", // Text color for the dropdown (black on white)
//           textAlign: "center", // Center the text within the dropdown
//         }}
//       >
//         <div className="w-50 p-3 border rounded bg-light">
//           <h4
//             style={{
//               fontSize: "1.5rem", // Larger font size
//               fontWeight: "bold", // Bold text
//               marginBottom: "1rem", // Space between heading and dropdown
//             }}
//           >
//             Select Locality
//           </h4>
//           <select className="form-select">
//             {options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useContext } from "react";
import NodeDropdown from "./NodeDropdown"; // Adjust the path if necessary
import { UserContext } from "../../context/userContext"; // Adjust the path if necessary
import ThreeScene from "../ThreeScene"; // Adjust the path if necessary

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh", // Takes full height of the viewport
      }}
    >
      {/* ThreeScene component rendering */}
      <div
        className="d-flex flex-column justify-content-center align-items-center mb-4"
        style={{
          width: "70%",
          height: "70%", // Adjusted height to ensure it fits well
        }}
      >
        {/* Display user's locality name */}
        <h4
          style={{
            fontSize: "1.5rem", // Larger font size
            fontWeight: "bold", // Bold text
            marginBottom: "1rem", // Space between heading and dropdown
          }}
        >
          {user && user.locality ? user.locality.name : "Loading..."}
        </h4>

        <ThreeScene />
      </div>

      {/* NodeDropdown and select locality */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          width: "70%",
          color: "black", // Text color for the dropdown (black on white)
          textAlign: "center", // Center the text within the dropdown
        }}
      >
        <div className="w-50 p-3 border rounded bg-light">
          <h4
            style={{
              fontSize: "1.5rem", // Larger font size
              fontWeight: "bold", // Bold text
              marginBottom: "1rem", // Space between heading and dropdown
            }}
          >
            Select Node
          </h4>
          <NodeDropdown />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
