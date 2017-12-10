const { computeHash, computeFullHash } = require("./day10");
const fs = require("fs");

describe("computeHash", () => {
  it("should compute correct hash", () => {
    expect(computeHash(5, "3")).toBe(2);
    expect(computeHash(5, "3, 4")).toBe(12);
    expect(computeHash(5, "3, 4, 1")).toBe(12);
    expect(computeHash(5, "3, 4, 1, 5")).toBe(12);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day10.txt", "utf8", (err, data) => {
      expect(computeHash(256, data)).toMatchSnapshot();
      done();
    });
  });
});

describe("computeFullHash", () => {
  it("should compute full hash", () => {
    expect(computeFullHash("")).toBe("a2582a3a0e66e6e86e3812dcb672a272");
    expect(computeFullHash("AoC 2017")).toBe(
      "33efeb34ea91902bb2f59c9920caa6cd"
    );
    expect(computeFullHash("1,2,3")).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
    expect(computeFullHash("1,2,4")).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
  });

  it("should get the value", done => {
    fs.readFile("inputs/day10.txt", "utf8", (err, data) => {
      expect(computeFullHash(data)).toMatchSnapshot();
      done();
    });
  });
});
