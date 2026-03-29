const { Router } = require("express");
const router = Router();
const asyncHandler = require("../config/asyncHandler");
const registerUser = require("../controllers/auth.controller").registerUser;

router.post("/register", asyncHandler(registerUser));

module.exports = router;
