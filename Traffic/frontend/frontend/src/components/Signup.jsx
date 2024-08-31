//src/components/Signup.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [locality, setLocality] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const registerUser = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !name ||
//       !phoneNumber ||
//       !locality
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     // Send registration data to the backend
//     axios
//       .post("http://localhost:3001/register", {
//         email,
//         password,
//         confirmPassword,
//         name,
//         phoneNumber,
//         locality,
//       })
//       .then((result) => {
//         console.log(result);
//         if (result.data) {
//           alert(
//             `User registered successfully! Your username is ${result.data.username}`
//           );
//           navigate("/login");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h2>
//           <center>Sign Up</center>
//         </h2>
//         <form onSubmit={registerUser}>
//           <div className="mb-3">
//             <label htmlFor="name">
//               <strong>Name</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter name"
//               autoComplete="off"
//               name="name"
//               className="form-control rounded-0"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="phoneNumber">
//               <strong>Phone Number</strong>
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter Phone Number"
//               autoComplete="off"
//               name="phoneNumber"
//               className="form-control rounded-0"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="locality">
//               <strong>Locality</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Locality"
//               autoComplete="off"
//               name="locality"
//               className="form-control rounded-0"
//               value={locality}
//               onChange={(e) => setLocality(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               className="form-control rounded-0"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="confirmPassword">
//               <strong>Confirm Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               name="confirmPassword"
//               className="form-control rounded-0"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-3">Already have an account?</p>
//         <Link
//           to="/login"
//           className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
//         >
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Add state for error messages
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword || !name || !phoneNumber || !locality) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send registration data to the backend
      const result = await axios.post("http://localhost:3001/register", {
        email,
        password,
        confirmPassword,
        name,
        phoneNumber,
        locality,
      });

      if (result.data) {
        alert(`User registered successfully! Your username is ${result.data.username}`);
        navigate("/login");
      }
    } catch (err) {
      // Display error message from the backend
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Sign Up</center>
        </h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error messages */}
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">
              <strong>Phone Number</strong>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              autoComplete="off"
              name="phoneNumber"
              className="form-control rounded-0"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="locality">
              <strong>Locality</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Locality"
              autoComplete="off"
              name="locality"
              className="form-control rounded-0"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
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
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="form-control rounded-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>
        </form>
        <p className="mt-3">Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
