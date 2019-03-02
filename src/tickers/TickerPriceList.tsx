import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ApiClient from "../api/ApiClient";
import ComponentSize from "../common/ComponentSize";
import Spinner from "../common/Spinner";
import Logger from "../logging/Logger";
import Ticker from "../models/Ticker";
import Theme from "../Theme";
import TickerAction from "./TickerAction";
import TickerPriceListItem from "./TickerPriceListItem";
import TickerStore from "./TickerStore";

interface IProps {
  tickerStore: TickerStore;
}

const NB_COLUMNS = 2;
const MARGIN_BETWEEN_ITEMS = 5;
const CONTAINER_PADDING = Theme.globalStyles.padding;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    margin: MARGIN_BETWEEN_ITEMS
  },
  list: {
    padding: CONTAINER_PADDING
  }
});

@inject("tickerStore")
@observer
export default class TickerPriceList extends Component<IProps> {
  componentDidMount() {
    this.props.tickerStore.getTickers(TickerAction.FETCH);
  }

  onRefresh = () => {
    this.props.tickerStore.getTickers(TickerAction.REFRESH);
  }

  renderItem(props: { item: Ticker }) {
    const size = ComponentSize.computeFromWindow(
      NB_COLUMNS,
      MARGIN_BETWEEN_ITEMS * 2 * NB_COLUMNS + CONTAINER_PADDING * 2
    );

    return (
      <View style={styles.item}>
        <TickerPriceListItem size={size} ticker={props.item} />
      </View>
    );
  }

  render() {
    if (this.props.tickerStore.loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={this.props.tickerStore.tickers.slice()}
        keyExtractor={item => item.pairName}
        numColumns={NB_COLUMNS}
        onRefresh={this.onRefresh}
        refreshing={false}
        renderItem={this.renderItem}
      />
    );
  }
}
