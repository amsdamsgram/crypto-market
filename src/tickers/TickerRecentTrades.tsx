import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

import ComponentSize from "../common/ComponentSize";
import Txt from "../common/Txt";
import Ticker from "../models/Ticker";
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
export default class TickerRecentTrades extends Component<IProps> {
  static defaultProps = {
    tickerStore: null
  };

  componentDidMount() {
    this.props.tickerStore.getTickerRecentTrades();
  }

  render() {
    return <Txt style={styles.name}>Hello</Txt>;
  }
}
