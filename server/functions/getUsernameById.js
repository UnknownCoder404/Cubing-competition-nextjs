const User = require("../Models/user");
async function getUsernameById(id) {
  try {
    const user = await User.findById(id);
    return user ? (user.username ? user.username : null) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
module.exports = { getUsernameById };
