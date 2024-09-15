const express = require("express");
const router = express.Router();
const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const loginLimiter = require("../../rateLimiter/login");
dotenv.config();

router.post("/", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate the input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Korisničko ime i lozinka su obavezni." });
    }

    // Find the user by username
    const user = await User.findOne({ username: { $eq: username } }).select(
      "+password",
    ); // Select the password field only

    // Check if the user exists and the password matches
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Korisničko ime ili lozinka nisu ispravni." });
    }

    // Generate a JSON web token with the user id as the payload
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION || "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      sameSite: "None", // Required for cross-origin cookies
      signed: false,
      secure: true, // Enable this even in development, or try setting it dynamically
    });
    res.status(200).json({
      message: "Korisnik se uspješno prijavio.",
      info: { id: user._id, token, username: username, role: user.role },
    });
  } catch (err) {
    // Log the error for internal debugging, but don't expose details to the client
    console.error(`Error in login:\n ${err}`);
    res.status(500).json({ message: "Došlo je do pogreške na poslužitelju." });
  }
});

module.exports = router;
