const express = require("express");

const { createLike, deleteLike } = require("../controllers/likeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// @desc    Create a like
// @route   POST /api/like/:postId
// @access  Private
router.post("/:postId", protect, createLike);

// @desc    Delete a like
// @route   DELETE /api/like/:postId
// @access  Private
router.delete("/:postId", protect, deleteLike);

module.exports = router;
