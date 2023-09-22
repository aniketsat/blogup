const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const comment = req.body.comment;

  const newComment = await Comment.create({
    comment,
    post: postId,
    user: req.user._id,
  });

  if (!newComment) {
    res.status(400);
    throw new Error("Invalid comment data");
  }

  res.status(201).json({
    message: "Comment created successfully",
    comment: {
      _id: newComment._id,
      comment: newComment.comment,
      user: {
        _id: req.user._id,
        username: req.user.username,
        name: req.user.name,
        avatar: req.user.avatar,
        email: req.user.email,
      },
      createdAt: newComment.createdAt,
    },
  });
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  res.status(200).json({
    message: "Comment deleted successfully",
    data: comment,
  });
});

module.exports = {
  createComment,
  deleteComment,
};
