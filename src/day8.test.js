const { largestRegister } = require("./day8");
const fs = require("fs");

describe("largestRegister", () => {
  it("should return the largest register", () => {
    expect(
      largestRegister(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`).max
    ).toBe(1);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day8.txt", "utf8", (err, data) => {
      expect(largestRegister(data).max).toMatchSnapshot();
      done();
    });
  });

  it("should return the largest register", () => {
    expect(
      largestRegister(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`).allTimeMax
    ).toBe(10);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day8.txt", "utf8", (err, data) => {
      expect(largestRegister(data).allTimeMax).toMatchSnapshot();
      done();
    });
  });
});
