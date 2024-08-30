require("dotenv").config({ path: process.env.ENV || ".env" });

const { validateEnv, config } = require("./src/config");

validateEnv();

const path = require("path");
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const logger = require("./src/utils/logger");
const bodyParser = require("body-parser");
const tradingRouter = require("./src/routes/assets-router");
const errorMiddleware = require("./src/middlewares/error-middleware");
const loggingMiddleware = require("./src/middlewares/logging-middleware");

const app = express();

function shutdown(server) {
  logger.debug("Closing HTTP server");
  server.close(async () => {
    logger.info("Server is shut down");
    process.exit(0);
  });
}

const mongoClient = new MongoClient(config.MONGODB_URI);

async function start() {
  try {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );

    app.use(loggingMiddleware);

    app.use("/view", (req, res) => {
      res.sendFile(path.join(__dirname, "client/index.html"));
    });

    app.use("/assets", tradingRouter(mongoClient));

    app.use(errorMiddleware);

    const server = app.listen(config.PORT, config.HOST, () => {
      logger.info(`Server is running on http://${config.HOST}:${config.PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => shutdown(server));
    process.on("SIGTERM", () => shutdown(server));
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    await mongoClient.close();
  }
}

start().catch((err) => {
  logger.error(err);
});
