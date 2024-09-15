const mongoose = require("mongoose");
// Define the schema for the Post model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Post model using the schema
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
