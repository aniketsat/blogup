const express = require("express");

const {
  registerUser,
  authUser,
  getAnyUserProfile,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");
const { uploadAvatar } = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post("/register", uploadAvatar.single("avatar"), registerUser);

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
router.post("/login", authUser);

// @desc    Get a user's profile
// @route   GET /api/users/:username
// @access  Public
router.get("/userprofile/:username", getAnyUserProfile);

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private
router.post("/logout", protect, logoutUser);

// @desc    Get a user's profile
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, getUserProfile);

// @desc    Update a user's profile
// @route   PUT /api/users/profile
// @access  Private
router.put("/profile", uploadAvatar.single("avatar"), updateUserProfile);

// @desc    Delete a user's profile
// @route   DELETE /api/users/profile
// @access  Private
router.delete("/profile", deleteUserProfile);

module.exports = router;
