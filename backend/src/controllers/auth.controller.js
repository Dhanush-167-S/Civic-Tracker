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
  user = await userModel.create(newUser);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  req.cookie("token", token);
  return res.status(201).json({
    success: true,
    message: "User created successfully!",
  });
}

module.exports = { registerUser };
