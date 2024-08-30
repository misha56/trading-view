const logger = require("../utils/logger");
const MongoService = require("../services/mongodb");

module.exports = (mongoClient) => {
  const mongoService = new MongoService(mongoClient);

  return {
    saveSymbolToFavorites: async (req, res, next) => {
      try {
        const { symbol } = req.body;

        if (!symbol) {
          res.status(400).json({ message: "Symbol is required" });
          return;
        }

        await mongoService.addSymbolToFavorites(symbol);

        res.sendStatus(201);
      } catch (err) {
        logger.error("Error saving symbol to favorites");
        next(err);
      }
    },
    getFavoriteSymbols: async (req, res, next) => {
      try {
        const favorites = await mongoService.getFavoriteSymbols();

        res.json(favorites);
      } catch (err) {
        logger.error("Error getting favorite symbols");
        next(err);
      }
    },
  };
};
