import { action, computed, observable, runInAction } from "mobx";

import ApiClient from "../api/ApiClient";
import ErrorStore from "../error/ErrorStore";
import Ticker from "../models/Ticker";
import Trade from "../models/Trade";
import TradeAction from "./TradeAction";

export default class TradeStore {
  apiClient: ApiClient;
  errorStore: ErrorStore;

  @observable loading: boolean = false;
  @observable refreshing: boolean = false;
  @observable currentTicker: Ticker;
  @observable recentTrades: Trade[] = [];

  constructor(apiClient: ApiClient, errorStore: ErrorStore) {
    this.apiClient = apiClient;
    this.errorStore = errorStore;
  }

  @computed
  get recentTradesPrices() {
    return this.recentTrades.map((r: Trade) => r.price);
  }

  @computed
  get recentTradesVolumes() {
    return this.recentTrades.map((r: Trade) => r.volume);
  }

  @action
  async getRecentTrades(interaction: TradeAction) {
    try {
      this.toggle(interaction, true);
      const trades = await this.apiClient.getTickerRecentTrades(
        this.currentTicker
      );

      runInAction(() => {
        this.recentTrades = trades;
        this.toggle(interaction, false);
      });
    } catch (err) {
      this.errorStore.notifyGlobalError();

      runInAction(() => {
        this.toggle(interaction, false);
      });
    }
  }

  @action
  setCurrentTicker(ticker: Ticker) {
    this.currentTicker = ticker;
  }

  @action
  toggle(interaction: TradeAction, value: boolean) {
    switch (interaction) {
      case TradeAction.FETCH:
        this.loading = value;
        break;
      case TradeAction.REFRESH:
        this.refreshing = value;
        break;
      default:
        break;
    }
  }
}
