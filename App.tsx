import * as mobx from "mobx";
import { Provider } from "mobx-react/native";
import React, { Component } from "react";

import ApiClient from "./src/api/ApiClient";
import Logger from "./src/logging/Logger";
import NavigationService from "./src/navigation/NavigationService";
import RootNavigator from "./src/navigation/RootNavigator";
import TickerStore from "./src/tickers/TickerStore";
import TradeStore from "./src/trades/TradeStore";

interface IProps {}

export default class App extends Component<IProps> {
  apiClient: ApiClient;
  logger: Logger;
  stores: any;

  constructor(props: IProps) {
    super(props);

    mobx.configure({
      enforceActions: "observed"
    });

    this.logger = new Logger();
    this.apiClient = new ApiClient(this.logger);
  }

  componentWillMount() {
    this.initStores();
  }

  initStores() {
    const tickerStore = new TickerStore(this.apiClient);
    const tradeStore = new TradeStore(this.apiClient);

    this.stores = {
      tickerStore,
      tradeStore
    };
  }

  render() {
    return (
      <Provider
        tickerStore={this.stores.tickerStore}
        tradeStore={this.stores.tradeStore}
      >
        <RootNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
