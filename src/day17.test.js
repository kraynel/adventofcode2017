const { getNextValue } = require("./day17");

describe("getNextValue", () => {
  it("get the next value", () => {
    expect(getNextValue(1, 3)).toBe(0);
    expect(getNextValue(2, 3)).toBe(0);
    expect(getNextValue(3, 3)).toBe(1);
    expect(getNextValue(4, 3)).toBe(1);
    expect(getNextValue(5, 3)).toBe(3);
    expect(getNextValue(6, 3)).toBe(2);
    expect(getNextValue(7, 3)).toBe(1);
    expect(getNextValue(8, 3)).toBe(2);
    expect(getNextValue(9, 3)).toBe(6);
    expect(getNextValue(10, 3)).toBe(5);
    expect(getNextValue(11, 3)).toBe(4);
    expect(getNextValue(2018, 3)).toBe(638);
  });

  it("should get the value", () => {
    expect(getNextValue(2018, 359)).toMatchSnapshot();
  });
});
