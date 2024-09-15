// Empty string or undefined = enabled
// any string other than empty string = disabled
const dotenv = require("dotenv");
dotenv.config();
const isRateLimitingEnabled = !Boolean(process.env.DISABLE_RATE_LIMITING);
module.exports = isRateLimitingEnabled;
