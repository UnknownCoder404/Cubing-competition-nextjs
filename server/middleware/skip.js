// This is a middleware function which skips to next function in the chain
// It is usually used when something lile rate limiting or cors is disabled
// It doesn't do anything but pass the request to the next function
const skip = (req, res, next) => {
  next();
};
module.exports = skip;
