import React from "react";
import styled from "styled-components/native";

import Theme from "../Theme";

interface IProps {
  children?: any;
  style?: any;
}

const StyledText = styled.Text`
  color: ${Theme.colors.text};
  font-size: ${Theme.globalStyles.fontSize}px;
`;

const Txt = (props: IProps) => {
  return (
    <StyledText {...props} style={props.style}>
      {props.children}
    </StyledText>
  );
};

Txt.defaultProps = {
  children: null,
  style: null
};

export default Txt;
