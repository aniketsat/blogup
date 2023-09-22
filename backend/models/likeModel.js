const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
});

// Prevent user from liking a post more than once
likeSchema.index({ user: 1, post: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);
