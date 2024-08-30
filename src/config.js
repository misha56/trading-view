const config = {
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SPREAD_PERCENTAGE: parseInt(process.env.SPREAD_PERCENTAGE),
  BINANCE_PRICES_API: process.env.BINANCE_PRICES_API,
};

function validateEnv() {
  if (!config.NODE_ENV) {
    throw new Error("NODE_ENV must be defined");
  }
  if (!config.LOG_LEVEL) {
    throw new Error("LOG_LEVEL must be defined");
  }

  if (!config.HOST) {
    throw new Error("HOST must be defined");
  }
  if (!config.PORT) {
    throw new Error("PORT must be defined");
  }

  if (!config.MONGODB_URI) {
    throw new Error("MONGODB_URI must be defined");
  }
  if (!config.DATABASE_NAME) {
    throw new Error("DATABASE_NAME must be defined");
  }

  if (!config.SPREAD_PERCENTAGE) {
    throw new Error("SPREAD_PERCENTAGE must be defined");
  } else if (isNaN(config.SPREAD_PERCENTAGE)) {
    throw new Error("SPREAD_PERCENTAGE must be a number");
  }

  if (!config.BINANCE_PRICES_API) {
    throw new Error("BINANCE_PRICES_API must be defined");
  }
}

module.exports = {
  config,
  validateEnv,
};
