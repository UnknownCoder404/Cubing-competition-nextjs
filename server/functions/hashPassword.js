const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashPassword = async (plainPassword) => {
  try {
    console.time("Hashing password");
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.timeEnd("Hashing password");
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Hashing failed");
  }
};
module.exports = hashPassword;
