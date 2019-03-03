import React from "react";
import renderer from "react-test-renderer";

import Chart from "./Chart";

describe("Chart", () => {
  test("should match snapshot", () => {
    const tree = renderer
      .create(
        <Chart
          color="white"
          data={[1, 2, 3, 4, 5]}
          height={100}
          title="Title"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
