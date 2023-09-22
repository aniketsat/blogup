const mongoose = require("mongoose");

const saveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

saveSchema.index({ user: 1, post: 1 }, { unique: true }); // Prevents user from saving a post more than once

const Save = mongoose.model("Save", saveSchema);

module.exports = Save;
