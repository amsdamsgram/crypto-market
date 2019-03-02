import AssetPair from "../models/AssetPair";

export default class OutputMapper {
  mapAssetPairs(assetPairs: AssetPair[]) {
    return assetPairs.map((pair: AssetPair) => pair.name).join(",");
  }
}
