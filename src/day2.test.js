const { getChecksum, getChecksum2 } = require("./day2");
const fs = require("fs");

describe("getChecksum", () => {
  it("should compute example checksum", () => {
    expect(
      getChecksum(`5 1 9 5
7 5 3
2 4 6 8`)
    ).toBe(18);
  });

  it("should print the answer", done => {
    fs.readFile("inputs/day2.txt", "utf8", (err, data) => {
      expect(getChecksum(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("getChecksum2", () => {
  it("should compute example checksum", () => {
    expect(
      getChecksum2(`5 9 2 8
9 4 7 3
3 8 6 5`)
    ).toBe(9);
  });

  it("should print the answer", done => {
    fs.readFile("inputs/day2.txt", "utf8", (err, data) => {
      expect(getChecksum2(data)).toMatchSnapshot();
      done();
    });
  });
});
