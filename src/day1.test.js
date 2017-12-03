const { getHash } = require("./day1");

describe("getHash", () => {
  it("should solve example hash 1", () => {
    expect(getHash("1122")).toBe(3);
  });

  it("should solve example hash 2", () => {
    expect(getHash("1111")).toBe(4);
  });

  it("should solve example hash 3", () => {
    expect(getHash("1234")).toBe(0);
  });

  it("should solve example hash 4", () => {
    expect(getHash("91212129")).toBe(9);
  });
});
