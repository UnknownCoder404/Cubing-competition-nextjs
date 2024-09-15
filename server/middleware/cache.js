const NodeCache = require("node-cache");

// Initialize NodeCache without a global TTL
const nodeCache = new NodeCache({ checkperiod: 5 });

// Middleware factory function to create cache middleware with custom TTL
const cache = (ttl) => {
  console.time("cache");
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = nodeCache.get(key);
    if (cachedResponse) {
      console.timeEnd("cache");
      res.send(cachedResponse);
    } else {
      console.timeEnd("cache");
      res.originalSend = res.send;
      res.send = (body) => {
        nodeCache.set(key, body, ttl);
        res.originalSend(body);
      };
      next();
    }
  };
};
module.exports = cache;
