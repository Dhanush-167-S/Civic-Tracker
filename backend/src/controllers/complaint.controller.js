const complaintModel = require("../models/complaint.model");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

async function registerComplaint(req, res) {
  const { title, description, location } = req.body;
  const file = req.file;

  const user = req.user;
  if (!title || !description || !location || !file) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }
  const existingComplaint = await complaintModel.findOne({
    $and: [{ title }, { location }],
  });
  if (existingComplaint) {
    return res.status(409).json({
      success: false,
      message: "Complaint already exists with this title and location",
    });
  }
  let image = "";
  if (file) {
    const fileUri = getDataUri(file).content;
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
      folder: "complaints",
    });
    image = cloudinaryResponse.secure_url;
  }
  const newComplaint = {
    title,
    description,
    location,
    image,
    createdBy: user._id,
  };
  const complaint = await complaintModel.create(newComplaint);
  return res.status(201).json({
    success: true,
    message: "Complaint created successfully!",
    complaint,
  });
}

async function upVoteComplaint(req, res) {
  const userId = req.user._id;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const complaint = await complaintModel.findById(id);
  if (!complaint) {
    return res.status(404).json({
      success: false,
      message: "Complaint not found",
    });
  }
  const alreadyVoted = complaint.userVotes.some(
    (_id) => _id.toString() === userId.toString(),
  );
  if (alreadyVoted) {
    complaint.userVotes.pull(userId);
  } else {
    complaint.userVotes.push(userId);
  }
  await complaint.save();
  return res.status(200).json({
    success: true,
    message: alreadyVoted ? "Vote removed" : "Complaint Upvoted",
  });
}
async function updateComplaintStatus(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const complaint = await complaintModel.findById(id);
  if (!complaint) {
    return res.status(404).json({
      success: false,
      message: "Complaint not found",
    });
  }
  if (complaint.status === "Pending") {
    complaint.status = "Resolved";
    await complaint.save();
  } else {
    return res.status(400).json({
      success: false,
      message: "Complaint status is already updated",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Complaint status updated successfully!",
    status: complaint.status,
  });
}
async function deleteComplaint(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid complaint",
    });
  }
  let query = { _id: id };
  if (req.user.role !== "admin") {
    query.createdBy = req.user._id;
  }
  const deleteComplaint = await complaintModel.findOneAndDelete(query);
  if (!deleteComplaint) {
    return res.status(404).json({
      success: false,
      message: "Complaint not found or not authorized",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Complaint deleted successfully!",
  });
}

async function getAllComplaints(req, res) {
  const complaints = await complaintModel.aggregate([
    {
      $addFields: {
        voteCount: { $size: "$userVotes" },
      },
    },
    {
      $sort: {
        voteCount: -1,
        createdAt: -1,
      },
    },
  ]);
  return res.status(200).json({
    success: true,
    message: "Complaints fetched successfully!",
    complaints,
  });
}
async function getComplaintById(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid complaint",
    });
  }
  const complaint = await complaintModel.findById(id);
  if (!complaint) {
    return res.status(404).json({
      success: false,
      message: "Complaint not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Fetched complaint successfully!",
    complaint,
  });
}

module.exports = {
  registerComplaint,
  upVoteComplaint,
  updateComplaintStatus,
  getAllComplaints,
  getComplaintById,
  deleteComplaint,
};
