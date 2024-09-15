const rateLimit = require("express-rate-limit");
const isRateLimitingEnabled = require("../config/isRateLimitingEnabled");
const skip = require("../middleware/skip");
// Define the rate limit
const generalLimiter = isRateLimitingEnabled
  ? rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 500 requests per windowMs
      message:
        "Too many requests from this IP, please try again after 15 minutes",
      headers: true, // Send X-RateLimit-* headers with limit and remaining
    })
  : skip;

module.exports = generalLimiter;
