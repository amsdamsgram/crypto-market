import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import ApiClient from "./src/api/ApiClient";
import Logger from "./src/logging/Logger";
import RootNavigator from "./src/navigation/RootNavigator";

interface IProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class App extends Component<IProps> {
  apiClient: ApiClient;
  logger: Logger;

  constructor(props: IProps) {
    super(props);

    this.logger = new Logger();
    this.apiClient = new ApiClient(this.logger);
  }

  render() {
    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    );
  }
}
