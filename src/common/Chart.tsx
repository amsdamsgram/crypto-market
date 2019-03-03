import React, { Component } from "react";
import { View } from "react-native";
import { Grid, LineChart, YAxis } from "react-native-svg-charts";
import styled from "styled-components/native";

import Txt from "../common/Txt";
import Theme from "../Theme";

interface IProps {
  color: string;
  data: number[];
  height: number;
  title: string;
}

const AXE_FONT_SIZE = 10;

const StyledChart = styled(LineChart)`
  flex: 1;
  margin-left: 10px;
`;

const Container = styled.View`
  flex-direction: row;
  padding: ${Theme.globalStyles.padding}px;
`;

const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Theme.globalStyles.padding}px;
`;

const Title = styled(Txt)`
  font-size: 20px;
  font-weight: 500;
`;

export default class Chart extends Component<IProps> {
  renderHeader() {
    return (
      <Header>
        <Title>{this.props.title}</Title>
      </Header>
    );
  }
  render() {
    const verticalContentInset = { top: 10, bottom: 10 };

    return (
      <View>
        {this.renderHeader()}
        <Container style={{ height: this.props.height }}>
          <YAxis
            data={this.props.data}
            contentInset={verticalContentInset}
            svg={{
              fill: Theme.colors.textSecondary,
              fontSize: AXE_FONT_SIZE
            }}
          />
          <StyledChart
            data={this.props.data}
            contentInset={verticalContentInset}
            svg={{ stroke: Theme.colors.primary }}
          >
            <Grid />
          </StyledChart>
        </Container>
      </View>
    );
  }
}
