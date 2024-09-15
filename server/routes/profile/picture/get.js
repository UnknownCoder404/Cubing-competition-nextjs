const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  allowedPfpExtensions,
} = require("../../../config/allowedPfpExtensions");
const User = require("../../../Models/user");
async function sendProfilePicture(req, res, id) {
  try {
    let pfpPath = null;
    allowedPfpExtensions.forEach((ext) => {
      const currentPfpPath = path.join(
        __dirname,
        "../../../",
        "public",
        "profile-pictures",
        `${id}${ext}`,
      );
      if (fs.existsSync(currentPfpPath)) {
        pfpPath = currentPfpPath;
      }
    });

    if (!pfpPath || !fs.existsSync(pfpPath)) {
      return res.status(404).json({ message: "Profile picture not found" });
    }
    return res.status(200).sendFile(pfpPath);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while sending profile picture" });
  }
}

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", userNotFound: true });
    }
    sendProfilePicture(req, res, req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while sending profile picture" });
  }
});

module.exports = router;
