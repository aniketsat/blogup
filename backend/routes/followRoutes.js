const express = require("express");

const {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowings,
} = require("../controllers/followController.js");

const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// @desc    Create new follow
// @route   POST /api/follows/:id
// @access  Private
router.post("/:id", protect, createFollow);

// @desc    Delete a follow
// @route   DELETE /api/follows/:id
// @access  Private
router.delete("/:id", protect, deleteFollow);

// @desc    Get all followers
// @route   GET /api/follows/followers
// @access  Private
router.get("/followers", protect, getFollowers);

// @desc    Get all followings
// @route   GET /api/follows/followings
// @access  Private
router.get("/followings", protect, getFollowings);

module.exports = router;
