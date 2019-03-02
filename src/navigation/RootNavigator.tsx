// @flow
import React from "react";
import { View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Theme from "../Theme";

import PriceList from "../prices/PriceList";

const AppNavigator = createStackNavigator(
  {
    PriceList: {
      navigationOptions: {
        title: "Prices"
      },
      screen: PriceList
    }
  },
  {
    cardStyle: {
      backgroundColor: Theme.colors.page
    },
    initialRouteName: "PriceList"
  }
);

export default createAppContainer(AppNavigator);
