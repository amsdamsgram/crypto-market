import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface IProps {
  size?: string;
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
  size: "large"
};

export default Spinner;
