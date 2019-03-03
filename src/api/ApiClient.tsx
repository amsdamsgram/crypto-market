import axios, { AxiosInstance } from "axios";

import Config from "../config/Config";
import Logger from "../logging/Logger";
import AssetPair from "../models/AssetPair";
import Ticker from "../models/Ticker";
import Trade from "../models/Trade";
import ApiClientUtils from "./ApiClientUtils";
import InputMapper from "./InputMapper";
import OutputMapper from "./OutputMapper";

export default class ApiClient {
  inputMapper: InputMapper;
  instance: AxiosInstance;
  logger: Logger;
  outputMapper: OutputMapper;

  constructor(logger: Logger) {
    this.inputMapper = new InputMapper();
    this.outputMapper = new OutputMapper();
    this.logger = logger;

    this.instance = axios.create({
      baseURL: Config.apiBaseURL
    });

    this.instance.interceptors.request.use(
      config => {
        ApiClientUtils.logRequest(this.logger, config);
        return config;
      },
      err => Promise.reject(err)
    );

    this.instance.interceptors.response.use(
      res => {
        ApiClientUtils.logResponse(this.logger, res);
        return res;
      },
      // TODO: handle errors
      err => {
        ApiClientUtils.logError(this.logger, err);
        return Promise.reject(err);
      }
    );
  }

  async getAssetPairs(): Promise<AssetPair[]> {
    const response = await this.instance.get(Config.routes.getAssetPairs);

    return Object.keys(response.data.result).map((key: string) =>
      this.inputMapper.mapAssetPair(response.data.result[key])
    );
  }

  async getTickerRecentTrades(ticker: Ticker): Promise<Trade[]> {
    const response = await this.instance.get(Config.routes.getRecentTrades, {
      params: { pair: ticker.pairName }
    });

    if (response.data.result[ticker.pairName]) {
      return response.data.result[ticker.pairName]
        .slice(0, Config.recentTradesLimit)
        .map((raw: any) => this.inputMapper.mapTrade(raw));
    }

    return [];
  }

  async getTickers(assetPairs: AssetPair[]): Promise<Ticker[]> {
    const response = await this.instance.get(Config.routes.getTicker, {
      params: { pair: this.outputMapper.mapAssetPairs(assetPairs) }
    });

    return Object.keys(response.data.result).map((key: string) =>
      this.inputMapper.mapTicker({
        ...response.data.result[key],
        pairName: key
      })
    );
  }
}
