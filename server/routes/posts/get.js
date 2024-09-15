const express = require("express");
const Post = require("../../Models/post");
const cache = require("../../middleware/cache");
const router = express.Router();
const { getUsernameById } = require("../../functions/getUsernameById");
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    // Construct response object with usernames
    const response = await Promise.all(
      posts.map(async (post) => ({
        title: post.title,
        description: post.description,
        author: {
          id: post.author.id, // Assuming this is the correct field for the author's id
          username: await getUsernameById(post.author.id),
        },
        createdAt: post.createdAt,
        id: post._id,
      })),
    );
    res.status(200).json(response); // Sending the constructed response
  } catch (err) {
    console.error(`Error in getting posts:\n ${err}`);
    res.status(500).json({ message: "Neuspješno dohvaćanje objava." });
  }
});
module.exports = router;
