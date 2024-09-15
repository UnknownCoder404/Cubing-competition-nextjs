const User = require("../../Models/user");
const findUser = async (req, res, next) => {
  try {
    // Finds user by req.userId value
    const userId = req.userId;
    const user = await User.findOne({ _id: { $eq: userId } });
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Greška pri serveru." });
  }
};
module.exports = findUser;
