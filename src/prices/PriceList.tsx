import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ApiClient from "../api/ApiClient";
import ComponentSize from "../common/ComponentSize";
import Spinner from "../common/Spinner";
import Logger from "../logging/Logger";
import Ticker from "../models/Ticker";
import Theme from "../Theme";
import PriceListItem from "./PriceListItem";

interface IProps {}
interface IState {
  isLoading: boolean;
  isRefreshing: boolean;
  tickers: Ticker[];
}

const NB_COLUMNS = 2;
const MARGIN_BETWEEN_ITEMS = 5;
const CONTAINER_PADDING = Theme.globalStyles.padding;

const styles = StyleSheet.create({
  container: {
    padding: CONTAINER_PADDING
  },
  item: {
    margin: MARGIN_BETWEEN_ITEMS
  }
});

export default class PriceList extends Component<IProps, IState> {
  apiClient: ApiClient;
  logger: Logger;

  constructor(props: IProps) {
    super(props);

    this.logger = new Logger();
    this.apiClient = new ApiClient(this.logger);

    this.state = { isLoading: false, isRefreshing: false, tickers: [] };
  }

  componentDidMount() {
    this.fetchTickers();
  }

  async fetchTickers() {
    this.setState(() => ({ isLoading: true }));
    const pairs = await this.apiClient.getAssetPairs();
    const tickers = await this.apiClient.getTicker(pairs);
    this.setState(() => ({ isLoading: false, tickers }));
  }

  async refreshTickers() {
    this.setState(() => ({ isRefreshing: true }));
    const pairs = await this.apiClient.getAssetPairs();
    const tickers = await this.apiClient.getTicker(pairs);
    this.setState(() => ({ isRefreshing: false, tickers }));
  }

  onRefresh = () => {
    this.refreshTickers();
  };

  renderItem(props: { item: Ticker }) {
    const size = ComponentSize.computeFromWindow(
      NB_COLUMNS,
      MARGIN_BETWEEN_ITEMS * 2 * NB_COLUMNS + CONTAINER_PADDING * 2
    );

    return (
      <View style={styles.item}>
        <PriceListItem size={size} ticker={props.item} />
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.state.tickers}
        keyExtractor={item => item.pairName}
        numColumns={NB_COLUMNS}
        onRefresh={this.onRefresh}
        refreshing={this.state.isRefreshing}
        renderItem={this.renderItem}
        style={styles.container}
      />
    );
  }
}
