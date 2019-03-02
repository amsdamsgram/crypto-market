// @flow
import React from "react";
import { View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Theme from "../Theme";

import TickerPriceList from "../tickers/TickerPriceList";

const AppNavigator = createStackNavigator(
  {
    TickerPriceList: {
      navigationOptions: {
        title: "Prices"
      },
      screen: TickerPriceList
    }
  },
  {
    cardStyle: {
      backgroundColor: Theme.colors.page
    },
    initialRouteName: "TickerPriceList"
  }
);

export default createAppContainer(AppNavigator);
