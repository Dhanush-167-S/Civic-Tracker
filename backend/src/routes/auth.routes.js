const { Router } = require("express");
const router = Router();
const asyncHandler = require("../config/asyncHandler");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/logout", asyncHandler(logoutUser));

module.exports = router;
