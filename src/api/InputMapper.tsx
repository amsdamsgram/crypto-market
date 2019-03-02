import AssetPair from "../models/AssetPair";
import Ticker from "../models/Ticker";

export default class InputMapper {
  mapAssetPair(raw: any) {
    return new AssetPair(raw.altname, raw.base, raw.quote);
  }

  mapTicker(raw: any) {
    return new Ticker(raw.name, raw.c[0]);
  }
}
