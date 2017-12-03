const { getChecksum } = require("./day2");

describe("getChecksum", () => {
  it("should compute example checksum", () => {
    expect(
      getChecksum(`5 1 9 5
7 5 3
2 4 6 8`)
    ).toBe(18);
  });
});
