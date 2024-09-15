const express = require("express");
const Post = require("../../Models/post");
const router = express.Router();
const isAdmin = require("../../utils/helpers/isAdmin");
const findUser = require("../../utils/helpers/findUser");
const verifyToken = require("../../middleware/verifyToken");
router.put("/edit/:id", verifyToken, isAdmin, findUser, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id nije naveden." });
    const { title, description } = req.body;
    if (
      !title ||
      !description ||
      typeof title !== "string" ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ message: "Neispravan format." });
    }
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        createdAt: new Date(),
        Author: {
          username: req.user.username,
          id: req.user.id,
        },
      },
      {
        new: true,
      },
    );
    if (!post) {
      return res.status(404).json({ message: "Objava nije pronađena." });
    }
    return res.status(200).json({ message: "Objava je ažurirana.", post });
  } catch (error) {
    console.error(`Error in editing post:\n ${error}`);
    res.status(500).json({ message: "Greška u serveru." });
  }
});
module.exports = router;
