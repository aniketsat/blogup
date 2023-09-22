const Post = require("../models/postModel");
const User = require("../models/userModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getLikes } = require("./likeController.js");
const { getSaves } = require("./saveController.js");

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({
    createdAt: -1,
  });

  let allPosts = posts.map(async (post) => {
    const author = await User.findById(post.author);
    const liked_users = await getLikes(post._id);
    const saved_users = await getSaves(post._id);
    const comment_count = await Comment.find({ post: post._id }).count();
    return {
      _id: post._id,
      title: post.title,
      body: post.body,
      cover: post.cover,
      createdAt: post.createdAt,
      slug: post.slug,
      like_count: liked_users.length || 0,
      liked_users: liked_users,
      saved_count: saved_users.length || 0,
      saved_users: saved_users,
      comment_count: comment_count,
      user: {
        _id: author._id,
        name: author.name,
        avatar: author.avatar,
        username: author.username,
      },
    };
  });
  res.json({
    message: "All posts fetched successfully",
    posts: await Promise.all(allPosts),
  });
});

const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  const author = await User.findById(post.author);
  const liked_users = await getLikes(post._id);
  const saved_users = await getSaves(post._id);

  const comments = await Comment.find({ post: post._id }).sort({
    createdAt: -1,
  });
  let allComments = [];
  allComments = comments?.map(async (comment) => {
    const commUser = await User.findById(comment.user);
    return {
      _id: comment._id,
      comment: comment.comment,
      createdAt: comment.createdAt,
      user: {
        _id: commUser._id,
        username: commUser.username,
        name: commUser.name,
        avatar: commUser.avatar,
        email: commUser.email,
      },
    };
  });
  const comment_count = allComments?.length || 0;

  const singlePost = {
    _id: post._id,
    title: post.title,
    body: post.body,
    cover: post.cover,
    createdAt: post.createdAt,
    slug: post.slug,
    like_count: liked_users.length || 0,
    liked_users: liked_users,
    saved_count: saved_users.length || 0,
    saved_users: saved_users,
    user: {
      _id: author._id,
      name: author.name,
      avatar: author.avatar,
      username: author.username,
    },
    comments: await Promise.all(allComments),
    comment_count: comment_count,
  };
  if (post) {
    res.json({
      message: "Post fetched successfully",
      post: singlePost,
    });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

const getAllPostsFromUser = asyncHandler(async (req, res) => {
  const author = await User.findOne({ username: req.params.username });
  const posts = await Post.find({ author: author._id }).sort({
    createdAt: -1,
  });
  let allPosts = posts.map(async (post) => {
    const liked_users = await getLikes(post._id);
    const saved_users = await getSaves(post._id);
    const comment_count = await Comment.find({ post: post._id }).count();
    return {
      _id: post._id,
      title: post.title,
      body: post.body,
      cover: post.cover,
      createdAt: post.createdAt,
      slug: post.slug,
      like_count: liked_users.length || 0,
      liked_users: liked_users,
      saved_count: saved_users.length || 0,
      saved_users: saved_users,
      comment_count: comment_count,
      user: {
        _id: author._id,
        name: author.name,
        avatar: author.avatar,
        username: author.username,
      },
    };
  });
  res.json({
    message: "All posts from a user fetched successfully",
    posts: await Promise.all(allPosts),
  });
});

const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const cover = req.file.path;

  const post = await Post.create({
    title,
    body,
    cover,
    author: req.user._id,
  });
  if (!post) {
    res.status(400);
    throw new Error("Invalid post data");
  }

  const author = await User.findById(post.author);
  const singlePost = {
    _id: post._id,
    title: post.title,
    body: post.body,
    cover: post.cover,
    createdAt: post.createdAt,
    slug: post.slug,
    like_count: 0,
    liked_users: [],
    saved_count: 0,
    saved_users: [],
    comment_count: 0,
    user: {
      _id: author._id,
      name: author.name,
      avatar: author.avatar,
      username: author.username,
    },
  };
  res.status(201).json({
    message: "Post created successfully",
    post: singlePost,
  });
});

const getAllPostsFromLoggedInUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user._id }).sort({
    createdAt: -1,
  });
  const author = await User.findById(req.user._id);
  let allPosts = posts.map(async (post) => {
    const liked_users = await getLikes(post._id);
    const saved_users = await getSaves(post._id);
    const comment_count = (await Comment.find({ post: post._id }).length) || 0;
    return {
      _id: post._id,
      title: post.title,
      body: post.body,
      cover: post.cover,
      createdAt: post.createdAt,
      slug: post.slug,
      like_count: liked_users.length || 0,
      liked_users: liked_users,
      saved_count: saved_users.length || 0,
      saved_users: saved_users,
      comment_count: comment_count,
      user: {
        _id: author._id,
        name: author.name,
        avatar: author.avatar,
        username: author.username,
      },
    };
  });

  res.json({
    message: "All posts from logged in user fetched successfully",
    posts: allPosts,
  });
});

const updatePost = asyncHandler(async (req, res) => {});

const deletePost = asyncHandler(async (req, res) => {});

module.exports = {
  getAllPosts,
  getSinglePost,
  getAllPostsFromUser,
  createPost,
  getAllPostsFromLoggedInUser,
  updatePost,
  deletePost,
};
