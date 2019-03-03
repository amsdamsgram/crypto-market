import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Spinner from "../common/Spinner";
import Txt from "../common/Txt";
import Ticker from "../models/Ticker";
import Theme from "../Theme";
import TickerAction from "./TickerAction";
import TickerPriceListItem from "./TickerPriceListItem";
import TickerStore from "./TickerStore";

interface IProps {
  tickerStore: TickerStore;
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Theme.globalStyles.padding + 15,
    paddingVertical: Theme.globalStyles.padding
  },
  headerText: {
    fontWeight: "bold"
  },
  item: {
    margin: 5
  },
  list: {
    padding: Theme.globalStyles.padding
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
  };

  renderHeader = () => (
    <View style={styles.header}>
      <Txt style={styles.headerText}>Pair</Txt>
      <Txt style={styles.headerText}>Price</Txt>
    </View>
  );

  renderItem(props: { item: Ticker }) {
    return (
      <View style={styles.item}>
        <TickerPriceListItem ticker={props.item} />
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
        ListHeaderComponent={this.renderHeader}
        onRefresh={this.onRefresh}
        refreshing={false}
        renderItem={this.renderItem}
      />
    );
  }
}
