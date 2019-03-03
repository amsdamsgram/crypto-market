import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Grid, LineChart, YAxis } from "react-native-svg-charts";

import Txt from "../common/Txt";
import Theme from "../Theme";

interface IProps {
  color: string;
  data: number[];
  height: number;
  title: string;
}

const AXE_FONT_SIZE = 10;

const styles = StyleSheet.create({
  chart: {
    flex: 1,
    marginLeft: 10
  },
  container: {
    flexDirection: "row",
    padding: Theme.globalStyles.padding
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.globalStyles.padding
  },
  title: {
    fontSize: 20,
    fontWeight: "500"
  }
});

export default class Chart extends Component<IProps> {
  renderHeader() {
    return (
      <View style={styles.header}>
        <Txt style={styles.title}>{this.props.title}</Txt>
      </View>
    );
  }
  render() {
    const verticalContentInset = { top: 10, bottom: 10 };

    return (
      <View>
        {this.renderHeader()}
        <View style={[styles.container, { height: this.props.height }]}>
          <YAxis
            data={this.props.data}
            contentInset={verticalContentInset}
            svg={{
              fill: Theme.colors.textSecondary,
              fontSize: AXE_FONT_SIZE
            }}
          />
          <LineChart
            style={styles.chart}
            data={this.props.data}
            contentInset={verticalContentInset}
            svg={{ stroke: Theme.colors.primary }}
          >
            <Grid />
          </LineChart>
        </View>
      </View>
    );
  }
}
