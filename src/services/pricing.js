const { config } = require("../config");

function calculateAskPrice(assetPrice) {
  return assetPrice + assetPrice * (config.SPREAD_PERCENTAGE / 100);
}

function calculateBidPrice(assetPrice) {
  return assetPrice - assetPrice * (config.SPREAD_PERCENTAGE / 100);
}

function getListOfAssetsAskBidPrices(assets) {
  if (!assets) {
    throw new Error("Assets is required");
  }

  return assets.map((asset) => {
    const askPrice = calculateAskPrice(asset.price);
    const bidPrice = calculateBidPrice(asset.price);

    return {
      symbol: asset.symbol,
      askPrice,
      bidPrice,
      time: asset.time,
    };
  });
}

module.exports = {
  getListOfAssetsAskBidPrices,
};
