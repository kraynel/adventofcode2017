const { getDistance } = require("./day3");

describe("getDistance", () => {
  it("should compute the correct distance 1", () => {
    expect(getDistance(1)).toBe(0);
  });

  it("should compute the correct distance 2", () => {
    expect(getDistance(12)).toBe(3);
  });

  it("should compute the correct distance 3", () => {
    expect(getDistance(23)).toBe(2);
  });

  it("should compute the correct distance 4", () => {
    expect(getDistance(1024)).toBe(31);
  });

  it("should print the answer", () => {
    expect(getDistance(289326)).toMatchSnapshot();
  });
});
