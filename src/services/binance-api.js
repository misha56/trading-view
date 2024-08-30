const { config } = require("../config");

function parseAssetsPrices(assetsPrices) {
  return assetsPrices.map((assetPrice) => {
    return {
      symbol: assetPrice.symbol,
      price: parseFloat(assetPrice.price),
      time: assetPrice.time,
    };
  });
}

async function fetchAssetsPrices() {
  try {
    const response = await fetch(config.BINANCE_PRICES_API);
    return parseAssetsPrices(await response.json());
  } catch (error) {
    throw new Error(`Failed to fetch assets prices: ${error}`);
  }
}

module.exports = {
  fetchAssetsPrices,
};
