const express = require("express");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const verifyToken = require("../../../middleware/verifyToken");
const router = express.Router();
const {
  allowedPfpExtensions,
  allowedMimeTypes,
} = require("../../../config/allowedPfpExtensions");
const fs = require("fs");
// Set storage engine
const storage = multer.memoryStorage();

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 8000000 }, // Limit file size to 8MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profilePicture");

// Check file type
function checkFileType(file, cb) {
  const extname = allowedPfpExtensions.includes(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedMimeTypes.includes(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Upload route
router.post("/", verifyToken, (req, res) => {
  const userId = req.userId;
  upload(req, res, async (error) => {
    if (!req.file) {
      return res.status(400).json({ message: "No profile picture uploaded" });
    }
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error uploading profile picture" });
    }
    // Delete any that are other extension
    allowedPfpExtensions.forEach((ext) => {
      const currentPfpPath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        "profile-pictures",
        `${userId}${ext}`,
      );
      if (fs.existsSync(currentPfpPath)) {
        fs.unlinkSync(currentPfpPath);
      }
    });
    await storeProfilePicture(req, res);
  });
});

async function storeProfilePicture(req, res) {
  const userId = req.userId;

  const filename = userId + path.extname(req.file.originalname);

  const outputPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "profile-pictures",
    filename,
  );

  try {
    await sharp(req.file.buffer).resize(200).toFile(outputPath);
    return res
      .status(200)
      .json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    console.error(`Error resizing profile picture: ${error}`);
    return res.status(500).json({ message: "Error uploading profile picture" });
  }
}

module.exports = router;
