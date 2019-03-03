import { action, observable, runInAction } from "mobx";

import ApiClient from "../api/ApiClient";
import Ticker from "../models/Ticker";
import Trade from "../models/Trade";
import TickerAction from "./TickerAction";

export default class TickerStore {
  apiClient: ApiClient;

  @observable loading: boolean = false;
  @observable refreshing: boolean = false;
  @observable tickers: Ticker[] = [];
  @observable currentTicker: Ticker;
  @observable recentTrades: Trade[] = [];

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  @action
  async getTickers(interaction: TickerAction) {
    try {
      this.toggle(interaction, true);
      const pairs = await this.apiClient.getAssetPairs();
      const tickers = await this.apiClient.getTickers(pairs);

      runInAction(() => {
        this.tickers = tickers;
        this.toggle(interaction, false);
      });
    } catch (err) {
      runInAction(() => {
        this.toggle(interaction, false);
      });
    }
  }

  @action
  async getTickerRecentTrades() {
    try {
      this.toggle(TickerAction.FETCH, true);
      const trades = await this.apiClient.getTickerRecentTrades(
        this.currentTicker
      );

      runInAction(() => {
        this.recentTrades = trades;
        this.toggle(TickerAction.FETCH, false);
      });
    } catch (err) {
      runInAction(() => {
        this.toggle(TickerAction.FETCH, false);
      });
    }
  }

  @action
  setCurrentTicker(ticker: Ticker) {
    this.currentTicker = ticker;
  }

  @action
  toggle(interaction: TickerAction, value: boolean) {
    switch (interaction) {
      case TickerAction.FETCH:
        this.loading = value;
        break;
      case TickerAction.REFRESH:
        this.refreshing = value;
        break;
      default:
        break;
    }
  }
}
