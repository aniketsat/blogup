const Follow = require("../models/followModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createFollow = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const followId = req.params.id;
  const followUser = await User.findById(followId);

  const follow = await Follow.create({
    user: userId,
    follow: followId,
  });

  if (!follow) {
    res.status(400);
    throw new Error("Invalid follow data");
  }

  res.status(201).json({
    message: `You are now following ${followUser.username}`,
    follow,
  });
});

const deleteFollow = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const followId = req.params.id;
  const followUser = await User.findById(followId);

  const follow = await Follow.findOneAndDelete({
    user: userId,
    follow: followId,
  });

  if (!follow) {
    res.status(400);
    throw new Error("Invalid follow data");
  }

  res.status(201).json({
    message: `You have unfollowed ${followUser.username}`,
    follow,
  });
});

const getFollowers = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const followers = await Follow.find({ follow: userId });

  if (!followers) {
    res.status(400);
    throw new Error("Invalid followers data");
  }

  res.status(200).json({
    message: "Followers fetched successfully",
    followers,
  });
});

const getFollowings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const followings = await Follow.find({ user: userId });

  if (!followings) {
    res.status(400);
    throw new Error("Invalid followings data");
  }

  res.status(200).json({
    message: "Followings fetched successfully",
    followings,
  });
});

const getFollowingsAsId = async (userId) => {
  const followings = await Follow.find({ user: userId });
  return followings.map((following) => following.follow);
};

const getFollowersAsId = async (userId) => {
  const followers = await Follow.find({ follow: userId });
  return followers.map((follower) => follower.user);
};

module.exports = {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowings,
  getFollowingsAsId,
  getFollowersAsId,
};
