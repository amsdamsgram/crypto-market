import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ApiClient from "../api/ApiClient";
import Spinner from "../common/Spinner";
import Logger from "../logging/Logger";
import Ticker from "../models/Ticker";

interface IProps {}
interface IState {
  tickers: Ticker[];
}

const styles = StyleSheet.create({});

export default class PriceList extends Component<IProps, IState> {
  apiClient: ApiClient;
  logger: Logger;

  constructor(props: IProps) {
    super(props);

    this.logger = new Logger();
    this.apiClient = new ApiClient(this.logger);

    this.state = { tickers: [] };
  }

  componentDidMount() {
    this.fetchTickers();
  }

  async fetchTickers() {
    const pairs = await this.apiClient.getAssetPairs();
    const tickers = await this.apiClient.getTicker(pairs);
    this.setState(() => ({ tickers }));
  }

  onRefresh() {
    // TODO: refresh prices
  }

  renderItem(props: { item: Ticker }) {
    return (
      <View>
        <Text>{props.item.pairName}</Text>
        <Text>{props.item.price}</Text>
      </View>
    );
  }

  render() {
    // return <Spinner />;

    return (
      <View>
        <Text>Price list</Text>
        <FlatList
          data={this.state.tickers}
          keyExtractor={item => item.pairName}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
