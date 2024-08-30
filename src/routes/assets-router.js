const express = require("express");
const PricingController = require("../controllers/pricing-controller");
const FavoritesController = require("../controllers/favorites-controller");

module.exports = (mongoClient) => {
  const router = express.Router();

  const pricingController = PricingController(mongoClient);

  router.get("/prices", pricingController.getAssetsPrices);

  const favoritesController = FavoritesController(mongoClient);

  router.get("/favorite-symbols", favoritesController.getFavoriteSymbols);
  router.post("/favorite-symbols", favoritesController.saveSymbolToFavorites);

  return router;
};
