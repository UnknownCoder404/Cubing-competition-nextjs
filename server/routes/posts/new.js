const express = require("express");
const Post = require("../../Models/post");
const verifyToken = require("../../middleware/verifyToken");
const isAdmin = require("../../utils/helpers/isAdmin");
const findUser = require("../../utils/helpers/findUser");
const router = express.Router();
router.post("/new", verifyToken, isAdmin, findUser, async (req, res) => {
  const user = req.user;
  const userId = req.userId;
  const username = user.username;
  const { title, description } = req.body;

  try {
    const newPost = await Post.create({
      title: title,
      description: description,
      author: {
        id: userId,
        username: username,
      },
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(`Error in creating post:\n ${err}`);
    res.status(500).json({ message: "Neuspješno objavljivanje posta." });
  }
});
module.exports = router;
