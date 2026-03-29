const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function isAuthenticated(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  try {
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins only",
    });
  }

  next();
}

module.exports = { isAuthenticated, isAdmin };
