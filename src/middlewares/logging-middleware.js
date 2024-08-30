const logger = require("../utils/logger");

function loggingMiddleware(req, res, next) {
  res.on("finish", () => {
    logger.info(`${req.method} ${req.url} STATUS: ${res.statusCode}`);
  });
  next();
}

module.exports = loggingMiddleware;
