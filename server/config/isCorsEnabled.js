// Empty string or undefined = enabled
// any string other than empty string = disabled
const dotenv = require("dotenv");
dotenv.config();
const isCorsEnabled = !Boolean(process.env.DISABLE_CORS);
module.exports = isCorsEnabled;
