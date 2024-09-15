// Route for getting backup
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const isAdmin = require("../../utils/helpers/isAdmin");
const archiver = require("archiver");
const backupsPath = path.join(__dirname, "../../backups");
const backupPath = path.join(__dirname, "../../backups.zip");
zipFolder(backupsPath, backupPath);

router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    return res.status(200).sendFile(backupPath);
  } catch (error) {
    return res.status(500).json({ message: "Error while getting backup" });
  }
});

function zipFolder(sourceFolder, outPath) {
  console.time("zipping backups");
  const output = fs.createWriteStream(outPath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on("close", () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      "Archiver has been finalized and the output file descriptor has closed.",
    );
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(sourceFolder, false);
  archive.finalize();
  console.timeEnd("zipping backups");
}
module.exports = router;
