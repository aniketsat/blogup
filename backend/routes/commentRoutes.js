const express = require("express");

const commentController = require("../controllers/commentControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// @ desc   Create a comment
// @ route  POST /api/comments
// @ access Private
router.post("/:id", protect, commentController.createComment);

// @ desc   Delete a comment
// @ route  DELETE /api/comments/:id
// @ access Private
router.delete("/:id", protect, commentController.deleteComment);

module.exports = router;
