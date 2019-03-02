import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

enum Size {
  "small",
  "large"
}

interface IProps {
  size: Size;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    padding: 10
  }
});

const Spinner = (props: IProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={props.size} />
    </View>
  );
};

Spinner.defaultProps = {
  size: Size.large
};

export default Spinner;
