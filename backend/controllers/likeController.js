const Like = require("../models/likeModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const createLike = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  const like = await Like.create({
    user: userId,
    post: postId,
  });
  if (!like) {
    res.status(400);
    throw new Error("Invalid like data");
  }

  res.status(201).json({
    message: "Post liked successfully",
    like,
  });
});

const deleteLike = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  const like = await Like.findOneAndDelete({ user: userId, post: postId });
  if (!like) {
    res.status(400);
    throw new Error("Invalid like data");
  }

  res.status(200).json({
    message: "Post unliked successfully",
    like,
  });
});

// get all likes of a post
const getLikes = async (postId) => {
  let likes = await Like.find({ post: postId }).select("user");
  likes = likes.map((like) => like.user);
  return likes;
};

module.exports = {
  createLike,
  deleteLike,
  getLikes,
};
