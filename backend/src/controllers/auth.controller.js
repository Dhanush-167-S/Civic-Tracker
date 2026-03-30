const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }
  const normalizedEmail = email.toLowerCase();
  const existingUser = await userModel.findOne({
    $or: [{ name }, { email: normalizedEmail }],
  });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists with this name or email",
    });
  }
  const newUser = {
    name,
    email: normalizedEmail,
    password,
  };
  const user = await userModel.create(newUser);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.status(201).json({
    success: true,
    message: "User created successfully!",
    user: {
      name: user._id,
      email: user.email,
      role: user.role,
      token,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }
  const normalizedEmail = email.toLowerCase();
  const user = await userModel
    .findOne({ email: normalizedEmail })
    .select("+ password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "User logged in sucessfully",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
}

// async function loginAdmin(req, res) {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing fields",
//     });
//   }
//   const normalizedEmail = email.toLowerCase();
//   const admin = await userModel.findOne({ email: normalizedEmail });
//   if (!admin) {
//     return res.status(404).json({
//       success: false,
//       message: "Admin not found",
//     });
//   }
//   if (admin.role !== "admin") {
//     return res.status(401).json({
//       success: false,
//       message: "Access denied!  : Admin only",
//     });
//   }
//   const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET);
//   return res.status(200).json({
//     success: true,
//     message: "Admin logged in successfully!",
//     admin: {
//       name: admin.name,
//       email: admin.email,
//       token,
//     },
//   });
// }

async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User logged out successfully!",
  });
}

module.exports = { registerUser, loginUser, logoutUser };
