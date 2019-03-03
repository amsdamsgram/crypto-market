import { createAppContainer, createStackNavigator } from "react-navigation";

import Theme from "../Theme";
import TickerPriceList from "../tickers/TickerPriceList";
import RecentTrades from "../trades/RecentTrades";

const AppNavigator = createStackNavigator(
  {
    RecentTrades: {
      screen: RecentTrades
    },
    TickerPriceList: {
      navigationOptions: {
        ...Theme.headerStyle,
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
