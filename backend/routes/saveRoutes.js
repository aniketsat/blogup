const express = require("express");

const {
  savePost,
  unsavePost,
  getSavedPosts,
} = require("../controllers/saveController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// @desc    Save a post
// @route   POST /api/saves
// @access  Private
router.post("/:id", protect, savePost);

// @desc    Unsave a post
// @route   DELETE /api/saves/:id
// @access  Private
router.delete("/:id", protect, unsavePost);

// @desc    Get all saved posts
// @route   GET /api/saves
// @access  Private
router.get("/", protect, getSavedPosts);

module.exports = router;
