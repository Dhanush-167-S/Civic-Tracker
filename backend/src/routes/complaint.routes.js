const { Router } = require("express");
const router = Router();
const {
  registerComplaint,
  upVoteComplaint,
  updateComplaintStatus,
  getAllComplaints,
  getComplaintById,
  deleteComplaint,
} = require("../controllers/complaint.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/mutler");

router.post(
  "/register",
  isAuthenticated,
  upload.single("file"),
  registerComplaint,
);

router.post("/upvote/:id", isAuthenticated, upVoteComplaint);
router.post("/update/:id", isAuthenticated, isAdmin, updateComplaintStatus);

router.get("/", isAuthenticated, getAllComplaints);
router.get("/:id", isAuthenticated, getComplaintById);

router.delete("/:id", isAuthenticated, isAdmin, deleteComplaint);

module.exports = router;
