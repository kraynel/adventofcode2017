const { getNumberOfSteps } = require("./day5");
const fs = require("fs");

describe("getNumberOfSteps", () => {
  it("should check if is valid 1", () => {
    expect(
      getNumberOfSteps(`0
3
0
1
-3`)
    ).toBe(5);
  });

  it("should log the correct value", done => {
    fs.readFile("inputs/day5.txt", "utf8", (err, data) => {
      expect(getNumberOfSteps(data)).toMatchSnapshot();
      done();
    });
  });
});
