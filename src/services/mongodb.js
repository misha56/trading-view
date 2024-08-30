const { config } = require("../config");

class MongoDB {
  constructor(client) {
    this.client = client;
    this.database = client.db(config.DATABASE_NAME);
  }

  // addSymbolToFavorites adds a symbol to the favorites collection
  async addSymbolToFavorites(symbol) {
    const collection = this.database.collection("favorites");
    // Use upsert to insert the symbol if it doesn't exist
    await collection.updateOne(
      { symbol },
      { $set: { symbol, addedAt: new Date() } },
      { upsert: true },
    );
  }

  // getFavoriteSymbols returns the favorite symbols sorted by the date they were added
  async getFavoriteSymbols() {
    const collection = this.database.collection("favorites");
    const options = {
      projection: { _id: 0, symbol: 1, addedAt: 1 },
    };
    return collection.find({}, options).sort({ addedAt: -1 }).toArray();
  }
}

module.exports = MongoDB;
