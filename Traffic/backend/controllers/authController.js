// // controllers/authController.js
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Locality = require('../models/locality');

// const EmployeeModel = require("../models/Employee");

// function generateUsername(name, phoneNumber) {
//   const randomDigits = phoneNumber.toString().slice(-4); // Last 4 digits of the phone number
//   const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomDigits}`;
//   return username;
// }

// exports.register = async (req, res) => {
//   try {
//     const { email, password, confirmPassword, name, phoneNumber, locality } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }


//     // Check if the locality exists
//     const existingLocality = await Locality.findOne({ name: locality });

//     if (!existingLocality) {
//       return res.status(400).json({ error: "The specified locality does not exist" });
//     }

//     // Check if the phone number or email already exists
//     const existingEmail = await EmployeeModel.findOne({ email });
//     const existingPhoneNumber = await EmployeeModel.findOne({ phoneNumber });

//     if (existingEmail || existingPhoneNumber) {
//       return res.status(400).json({ error: "Email or Phone Number already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate a username
//     const username = generateUsername(name, phoneNumber);

//     // Create a new employee
//     const newEmployee = new EmployeeModel({
//       email,
//       password: hashedPassword,
//       name,
//       phoneNumber,
//       locality,
//       username,
//     });

//     // Save the employee to the database
//     await newEmployee.save();
//     res.json({ message: "User registered successfully", username });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await EmployeeModel.findOne({ username });

//     if (!user) {
//       return res.status(400).json({ error: "No record existed" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "The password is incorrect" });
//     }

//     const token = jwt.sign(
//       { username: user.username, userId: user._id, name: user.name },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, { httpOnly: true }).json({
//       message: "Login successful",
//       user: { username: user.username, name: user.name, id: user._id },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.getUserInfo = async (req, res) => {
//   try {
//     const user = await EmployeeModel.findById(req.user.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       name: user.name,
//       email: user.email,
//       username: user.username,

//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out successfully" });
// };

// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Locality = require('../models/locality');

const EmployeeModel = require("../models/Employee");

function generateUsername(name, phoneNumber) {
  const randomDigits = phoneNumber.toString().slice(-4); // Last 4 digits of the phone number
  const username = `${name.toLowerCase().replace(/\s+/g, "")}${randomDigits}`;
  return username;
}

exports.register = async (req, res) => {
  try {
    const { email, password, confirmPassword, name, phoneNumber, locality } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the locality exists
    const existingLocality = await Locality.findOne({ name: locality });

    if (!existingLocality) {
      return res.status(400).json({ error: "The specified locality does not exist" });
    }

    // Check if the phone number or email already exists
    const existingEmail = await EmployeeModel.findOne({ email });
    const existingPhoneNumber = await EmployeeModel.findOne({ phoneNumber });

    if (existingEmail || existingPhoneNumber) {
      return res.status(400).json({ error: "Email or Phone Number already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a username
    const username = generateUsername(name, phoneNumber);

    // Create a new employee
    const newEmployee = new EmployeeModel({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      locality,
      username,
    });

    // Save the employee to the database
    await newEmployee.save();
    res.json({ message: "User registered successfully", username });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await EmployeeModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "No record existed" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "The password is incorrect" });
    }

    // Find the locality by name if it exists
    const locality = user.locality ? await Locality.findOne({ name: user.locality }) : null;

    // Generate the JWT token
    const token = jwt.sign(
      { username: user.username, userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Include the locality name in the response
    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      user: {
        username: user.username,
        name: user.name,
        id: user._id,
        locality: locality ? locality.name : null, // Include locality name
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserInfo = async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Query locality by name if it's a string
    const locality = user.locality ? await Locality.findOne({ name: user.locality }) : null;

    res.json({
      username: user.username,
      name: user.name,
      email: user.email,
      locality: locality
        ? {
            _id: locality._id,
            name: locality.name,
            location: locality.location,
          }
        : null,
    });

  } catch (err) {
    console.error("Error in getUserInfo:", err.message);
    res.status(500).json({ error: err.message });
  }
};





exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

