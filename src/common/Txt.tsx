import React from "react";
import { StyleSheet, Text } from "react-native";

import Theme from "../Theme";

interface IProps {
  children?: any;
  style?: any;
}

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.text,
    fontSize: Theme.globalStyles.fontSize
  }
});

const Txt = (props: IProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

Txt.defaultProps = {
  children: null,
  style: null
};

export default Txt;
