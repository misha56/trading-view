function sortAssetsByFavoritesFirst(assets, favorites) {
  const favoritesHashmap = favorites.reduce((hashmap, favorite) => {
    hashmap[favorite.symbol] = favorite.addedAt;
    return hashmap;
  }, {});
  const favoritesAssets = assets.filter(
    (asset) => !!favoritesHashmap[asset.symbol],
  );
  const nonFavoritesAssets = assets.filter(
    (asset) => !favoritesHashmap[asset.symbol],
  );
  return favoritesAssets
    .sort((a, b) => {
      if (favoritesHashmap[a.symbol] && favoritesHashmap[b.symbol]) {
        const aAddedAt = favoritesHashmap[a.symbol];
        const bAddedAt = favoritesHashmap[b.symbol];
        return bAddedAt - aAddedAt;
      }

      return 0;
    })
    .map((favoriteAsset) => ({
      ...favoriteAsset,
      isFavorite: true,
    }))
    .concat(nonFavoritesAssets);
}

module.exports = {
  sortAssetsByFavoritesFirst,
};
