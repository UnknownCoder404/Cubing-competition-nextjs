const User = require("../Models/user");

async function getUserById(id, fields = null) {
  try {
    let query = User.findOne({ _id: id });
    if (fields) {
      query = query.select(fields);
    }
    const user = await query;
    return user ? user : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
module.exports = { getUserById };
