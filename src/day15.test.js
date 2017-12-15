const { getFinalCount, getFinalCount2 } = require("./day15");

describe("getFinalCount", () => {
  it("should count", () => {
    expect(getFinalCount(65, 8921)).toBe(588);
  });

  it("should count", () => {
    expect(getFinalCount(703, 516)).toMatchSnapshot();
  });
});

describe("getFinalCount2", () => {
  it("should count 2", () => {
    expect(getFinalCount2(65, 8921)).toBe(309);
  });

  it("should count 2", () => {
    expect(getFinalCount2(703, 516)).toMatchSnapshot();
  });
});
