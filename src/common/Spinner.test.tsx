import React from "react";
import renderer from "react-test-renderer";

import Spinner from "./Spinner";

describe("Spinner", () => {
  test("should match snapshot", () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
