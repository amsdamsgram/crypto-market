import AssetPair from "../models/AssetPair";
import Ticker from "../models/Ticker";
import Trade from "../models/Trade";

export default class InputMapper {
  mapAssetPair(raw: any) {
    return new AssetPair(raw.altname, raw.base, raw.quote);
  }

  mapTicker(raw: any) {
    return new Ticker(raw.name, raw.c[0]);
  }

  mapTrade(raw: any) {
    return new Trade(raw[0], raw[1], new Date(raw[2] * 1000));
  }
}
