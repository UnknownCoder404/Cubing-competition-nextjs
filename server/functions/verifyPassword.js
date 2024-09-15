const bcrypt = require("bcrypt");
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err) {
    console.error("Error verifying password:", err);
    throw new Error("Verification failed");
  }
};
module.exports = verifyPassword;
