// @flow
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Txt from "../common/Txt";
import Theme from "../Theme";
import ErrorStore from "./ErrorStore";

interface IProps {
  errorStore: any | ErrorStore;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Theme.colors.text,
    bottom: 0,
    justifyContent: "center",
    padding: 15,
    position: "absolute",
    width: "100%",
    zIndex: 999
  },
  message: {
    color: Theme.colors.white,
    fontSize: 14,
    textAlign: "center"
  }
});

@inject("errorStore")
@observer
export default class GlobalErrorCard extends Component<IProps> {
  static defaultProps = {
    errorStore: null,
    navigationStore: null
  };

  render() {
    if (this.props.errorStore.message) {
      return (
        <View style={styles.container}>
          <Txt style={styles.message}>{this.props.errorStore.message}</Txt>
        </View>
      );
    }

    return null;
  }
}
