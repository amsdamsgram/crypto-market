import { createAppContainer, createStackNavigator } from "react-navigation";

import Theme from "../Theme";

import TickerPriceList from "../tickers/TickerPriceList";
import TickerRecentTrades from "../tickers/TickerRecentTrades";

const AppNavigator = createStackNavigator(
  {
    TickerPriceList: {
      navigationOptions: {
        title: "Prices"
      },
      screen: TickerPriceList
    },
    TickerRecentTrades: {
      navigationOptions: {
        title: "Recent Trades"
      },
      screen: TickerRecentTrades
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
