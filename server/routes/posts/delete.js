const express = require("express");
const mongoose = require("mongoose");
const Post = require("../../Models/post");
const verifyToken = require("../../middleware/verifyToken");
const isAdmin = require("../../utils/helpers/isAdmin");
const router = express.Router();
router.delete("/delete/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Nije naveden ID objave." });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID objave nije ispravan." });
    }
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Objava ne postoji." });
    }
    return res.status(200).json({ message: "Objava izbrisana." });
  } catch (error) {
    console.error(`Error in deleting post:\n ${error}`);
    return res.status(500).json({ message: "Neuspjelo brisanje objave." });
  }
});
module.exports = router;
