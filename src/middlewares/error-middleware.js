const logger = require("../utils/logger");

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  logger.error(err.message, err);

  const clientMessage =
    statusCode === 500
      ? "Something went wrong. Please try again later."
      : err.message;
  res.status(statusCode).json({ message: clientMessage });

  return;
}

module.exports = errorMiddleware;
