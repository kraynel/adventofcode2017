const { countBits, countIslands } = require("./day14");
const fs = require("fs");

describe("countBits", () => {
  it("should count", () => {
    expect(countBits("flqrgnkx")).toBe(8108);
  });

  it("should get the value", () => {
    expect(countBits("ugkiagan")).toMatchSnapshot();
  });
});

describe("countIslands", () => {
  it("should islands", () => {
    expect(countIslands("flqrgnkx")).toBe(1242);
  });

  it("should get the value", () => {
    expect(countIslands("ugkiagan")).toMatchSnapshot();
  });
});
