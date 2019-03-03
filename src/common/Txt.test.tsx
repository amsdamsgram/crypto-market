import React from "react";
import renderer from "react-test-renderer";

import Txt from "./Txt";

describe("Txt", () => {
  test("should match snapshot", () => {
    const tree = renderer.create(<Txt>Hello</Txt>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
