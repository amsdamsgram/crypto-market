import { inject, observer } from "mobx-react/native";
import React, { Component, Fragment } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import Chart from "../common/Chart";
import ComponentSize from "../common/ComponentSize";
import Spinner from "../common/Spinner";
import Txt from "../common/Txt";
import Config from "../config/Config";
import Ticker from "../models/Ticker";
import Theme from "../Theme";
import TradeAction from "./TradeAction";
import TradeStore from "./TradeStore";

interface IProps {
  size: ComponentSize;
  ticker: Ticker;
  tradeStore: any | TradeStore;
}

const CHART_HEIGHT = 400;

const styles = StyleSheet.create({
  container: {
    padding: Theme.globalStyles.padding
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: Theme.globalStyles.padding
  },
  headerText: {
    fontWeight: "bold"
  }
});

@inject("tradeStore")
@observer
export default class RecentTrades extends Component<IProps> {
  static defaultProps = {
    tickerStore: null
  };

  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<any>;
  }) => {
    return {
      ...Theme.headerStyle,
      title: navigation.getParam("pairName", "")
    };
  };

  componentDidMount() {
    this.props.tradeStore.getRecentTrades(TradeAction.FETCH);
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Txt style={styles.headerText}>{` Last ${
          Config.recentTradesLimit
        } trades`}</Txt>
      </View>
    );
  }

  renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.tradeStore.refreshing}
        onRefresh={() =>
          this.props.tradeStore.getRecentTrades(TradeAction.REFRESH)
        }
      />
    );
  }

  renderSpinner() {
    return <Spinner />;
  }

  renderCharts() {
    return (
      <Fragment>
        <Chart
          color={Theme.colors.primary}
          data={this.props.tradeStore.recentTradesPrices}
          height={CHART_HEIGHT}
          title="Prices"
        />
        <Chart
          color={Theme.colors.primary}
          data={this.props.tradeStore.recentTradesVolumes}
          height={CHART_HEIGHT}
          title="Volumes"
        />
      </Fragment>
    );
  }

  renderContent() {
    if (this.props.tradeStore.loading) {
      return this.renderSpinner();
    }

    return this.renderCharts();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={this.renderRefreshControl()}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </ScrollView>
    );
  }
}
