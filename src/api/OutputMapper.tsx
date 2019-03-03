import AssetPair from "../models/AssetPair";

export default class OutputMapper {
  mapAssetPair(assetPair: AssetPair) {
    return assetPair.name;
  }
  mapAssetPairs(assetPairs: AssetPair[]) {
    return assetPairs.map(this.mapAssetPair).join(",");
  }
}
