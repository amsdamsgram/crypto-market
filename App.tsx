import * as mobx from "mobx";
import { Provider } from "mobx-react/native";
import React, { Component } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import ApiClient from "./src/api/ApiClient";
import ErrorStore from "./src/error/ErrorStore";
import GlobalErrorCard from "./src/error/GlobalErrorCard";
import Logger from "./src/logging/Logger";
import NavigationService from "./src/navigation/NavigationService";
import RootNavigator from "./src/navigation/RootNavigator";
import Theme from "./src/Theme";
import TickerStore from "./src/tickers/TickerStore";
import TradeStore from "./src/trades/TradeStore";

interface IProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

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
    const errorStore = new ErrorStore();
    const tickerStore = new TickerStore(this.apiClient, errorStore);
    const tradeStore = new TradeStore(this.apiClient, errorStore);

    this.stores = {
      errorStore,
      tickerStore,
      tradeStore
    };
  }

  render() {
    return (
      <Provider
        errorStore={this.stores.errorStore}
        tickerStore={this.stores.tickerStore}
        tradeStore={this.stores.tradeStore}
      >
        <View style={styles.container}>
          <StatusBar
            backgroundColor={Theme.colors.primary}
            barStyle="light-content"
          />
          <RootNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          <GlobalErrorCard />
        </View>
      </Provider>
    );
  }
}
