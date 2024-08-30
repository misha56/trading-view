const logger = require("../utils/logger");
const { getListOfAssetsAskBidPrices } = require("../services/pricing");
const { fetchAssetsPrices } = require("../services/binance-api");
const { sortAssetsByFavoritesFirst } = require("../utils/utils");
const MongoService = require("../services/mongodb");

module.exports = (mongoClient) => {
  const mongoService = new MongoService(mongoClient);

  return {
    getAssetsPrices: async (req, res, next) => {
      try {
        const assets = await fetchAssetsPrices();
        const assetsWithPrices = getListOfAssetsAskBidPrices(assets);
        const favorites = await mongoService.getFavoriteSymbols();
        const sortedAssetsPricesByFavorites = sortAssetsByFavoritesFirst(
          assetsWithPrices,
          favorites,
        );

        res.json(sortedAssetsPricesByFavorites);
      } catch (err) {
        logger.error("Error getting assets prices");
        next(err);
      }
    },
  };
};
