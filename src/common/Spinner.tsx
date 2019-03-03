import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import Theme from "../Theme";

enum Size {
  "small",
  "large"
}

interface IProps {
  size: Size;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${Theme.globalStyles.padding}px;
`;

const Spinner = (props: IProps) => {
  return (
    <Container>
      <ActivityIndicator size={props.size} />
    </Container>
  );
};

Spinner.defaultProps = {
  size: "large"
};

export default Spinner;
