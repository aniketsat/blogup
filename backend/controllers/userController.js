const asyncHandler = require("express-async-handler");
const { generateFromEmail } = require("unique-username-generator");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const {
  getFollowingsAsId,
  getFollowersAsId,
} = require("./followController.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file.path;

  if (!name || !email || !password) {
    res.status(400);
    res.customErr = true;
    throw new Error("Please fill in all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    res.customErr = true;
    throw new Error("Email already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // generate username
  const username = generateFromEmail(email);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar,
    username,
  });
  if (!user) {
    res.status(400);
    res.customErr = true;
    throw new Error("Invalid creadentials");
  }

  res.json({
    _id: user._id,
    message: "Registration successful",
  });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(400);
    res.customErr = true;
    throw new Error("Invalid creadentials");
  }

  // check if password is correct
  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    res.status(400);
    res.customErr = true;
    throw new Error("Invalid creadentials");
  }

  // generate access token
  const accessToken = generateToken(
    userExists._id,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  // generate refresh token
  const refreshToken = generateToken(
    userExists._id,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  );

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  // send as httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
  });

  // send as response header
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
  });

  // get followings
  const followings = await getFollowingsAsId(userExists._id);
  // get followers
  const followers = await getFollowersAsId(userExists._id);

  // send response
  res.json({
    message: "Login successful",
    user: {
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      avatar: userExists.avatar,
      username: userExists.username,
      createdAt: userExists.createdAt,
      followers: followers,
      followings: followings,
    },
  });
});

const getAnyUserProfile = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username }).select("-password");

  if (!user) {
    res.status(404);
    res.customErr = true;
    throw new Error("No user with that username found");
  }

  // get followings
  const followings = await getFollowingsAsId(user._id);
  // get followers
  const followers = await getFollowersAsId(user._id);

  res.json({
    message: "Profile found",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      createdAt: user.createdAt,
      followers: followers,
      followings: followings,
    },
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });

  res.json({
    message: "Logout successful",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // get user data
  const user = await User.findById(userId).select("-password");
  if (!user) {
    res.status(404);
    res.customErr = true;
    throw new Error("User not found");
  }

  // get followings
  const followings = await getFollowingsAsId(userId);
  // get followers
  const followers = await getFollowersAsId(userId);

  res.json({
    message: "Profile found",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      createdAt: user.createdAt,
      followers: followers,
      followings: followings,
    },
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update");
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  res.send("delete");
});

module.exports = {
  registerUser,
  authUser,
  getAnyUserProfile,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
