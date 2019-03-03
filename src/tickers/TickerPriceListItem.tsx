import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import ComponentSize from "../common/ComponentSize";
import Txt from "../common/Txt";
import Ticker from "../models/Ticker";
import NavigationService from "../navigation/NavigationService";
import Theme from "../Theme";
import TickerStore from "./TickerStore";

interface IProps {
  size: ComponentSize;
  ticker: Ticker;
  tickerStore: any | TickerStore;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Theme.colors.white,
    borderColor: Theme.colors.separator,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    padding: Theme.globalStyles.padding
  },
  name: {
    fontWeight: "500"
  }
});

@inject("tickerStore")
@observer
export default class TickerPriceListItem extends Component<IProps> {
  static defaultProps = {
    tickerStore: null
  };

  onPress = () => {
    this.props.tickerStore.setCurrentTicker(this.props.ticker);
    NavigationService.navigate("TickerRecentTrades");
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.container, { width: this.props.size.width }]}
      >
        <Txt style={styles.name}>{this.props.ticker.pairName}</Txt>
        <Txt>{this.props.ticker.price}</Txt>
      </TouchableOpacity>
    );
  }
}
