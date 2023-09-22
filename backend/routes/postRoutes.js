const express = require("express");

const {
  getAllPosts,
  getSinglePost,
  getAllPostsFromUser,
  createPost,
  getAllPostsFromLoggedInUser,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadCover } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// @ desc     Fetch all posts
// @ route    GET /api/posts
// @ access   Public
router.get("/", getAllPosts);

// @ desc     Fetch single post
// @ route    GET /api/posts/:id
// @ access   Public
router.get("/:slug", getSinglePost);

// @ desc     Get all posts from a user
// @ route    GET /api/posts/user/:id
// @ access   Public
router.get("/user/:username", getAllPostsFromUser);

// @ desc     Create post
// @ route    POST /api/posts
// @ access   Private
router.post("/", protect, uploadCover.single("cover"), createPost);

// @ desc     Get all posts from logged in user
// @ route    GET /api/posts/me
// @ access   Private
router.get("/me", protect, getAllPostsFromLoggedInUser);

// @ desc     Update post
// @ route    PUT /api/posts/:id
// @ access   Private
router.put("/:slug", protect, uploadCover.single("cover"), updatePost);

// @ desc     Delete post
// @ route    DELETE /api/posts/:id
// @ access   Private
router.delete("/:slug", protect, deletePost);

module.exports = router;
