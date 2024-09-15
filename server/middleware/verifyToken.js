const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Define a middleware to verify the token
const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the request header or from parameters in the URL
    const token = req.headers["authorization"]
      ? req.headers["authorization"].replace(/^Bearer\s/, "")
      : new URLSearchParams(req.url.split("?")[1]).get("token");
    // Check if the token exists
    if (!token) {
      return res
        .status(403)
        .json({ message: "Nema tokena. Prijavi se ponovno." });
    }
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Set the user id to the request object
    req.userId = decoded.id;
    req.userRole = decoded.role;
    // Call the next middleware
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Pogrešan token. Pokušajte se ponovno prijaviti." });
  }
};
module.exports = verifyToken;
