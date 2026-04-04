const { Router } = require("express");
const router = Router();
const asyncHandler = require("../config/asyncHandler");
const isAuthenticated =
  require("../middlewares/auth.middleware").isAuthenticated;
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../controllers/auth.controller");

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/logout", asyncHandler(logoutUser));
router.get("/me", isAuthenticated, asyncHandler(getMe));

module.exports = router;
