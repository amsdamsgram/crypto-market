import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import ComponentSize from "../common/ComponentSize";
import Txt from "../common/Txt";
import Ticker from "../models/Ticker";
import Theme from "../Theme";

interface IProps {
  size: ComponentSize;
  ticker: Ticker;
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

const PriceListItem = (props: IProps) => (
  <TouchableOpacity style={[styles.container, { width: props.size.width }]}>
    <Txt style={styles.name}>{props.ticker.pairName}</Txt>
    <Txt>{props.ticker.price}</Txt>
  </TouchableOpacity>
);

export default PriceListItem;
