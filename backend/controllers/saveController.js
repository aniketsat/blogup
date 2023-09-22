const Save = require("../models/saveModel.js");
const User = require("../models/userModel.js");
const Post = require("../models/postModel.js");
const asyncHandler = require("express-async-handler");

const savePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const save = await Save.create({ user: userId, post: postId });

  if (!save) {
    res.status(400);
    throw new Error("Invalid data");
  }

  res.status(201).json({
    message: "Post saved",
    save,
  });
});

const unsavePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const save = await Save.findOneAndDelete({ user: userId, post: postId });

  if (!save) {
    res.status(400);
    throw new Error("Invalid data");
  }

  res.status(201).json({
    message: "Post unsaved",
    save,
  });
});

const getSavedPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const saves = await Save.find({ user: userId }).populate("post");

  if (!saves) {
    res.status(400);
    throw new Error("Invalid data");
  }

  res.status(201).json({
    message: "Saved posts retrieved",
    saves,
  });
});

const getSaves = async (postId) => {
  let saves = await Save.find({ post: postId }).select("user");
  saves = saves.map((save) => save.user);
  return saves;
};

module.exports = { savePost, unsavePost, getSavedPosts, getSaves };
