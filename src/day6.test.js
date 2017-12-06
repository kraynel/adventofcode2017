const { getCycleNumbers, getCycleLength } = require("./day6");

describe("getCycleNumbers", () => {
  it("should return the correct number of cycles", () => {
    expect(getCycleNumbers("0 2 7 0")).toBe(5);
  });

  it("should return the correct number of cycles", () => {
    expect(
      getCycleNumbers("0 5 10 0 11 14 13 4 11 8 8 7 1 4 12 11")
    ).toMatchSnapshot();
  });
});

describe("getCycleLength", () => {
  it("should return the correct number of cycles", () => {
    expect(getCycleLength("0 2 7 0")).toBe(4);
  });

  it("should return the correct number of cycles", () => {
    expect(
      getCycleLength("0 5 10 0 11 14 13 4 11 8 8 7 1 4 12 11")
    ).toMatchSnapshot();
  });
});
