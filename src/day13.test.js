const { getSeverity, getDelay } = require("./day13");
const fs = require("fs");

describe("getSeverity", () => {
  it("should return the severity", () => {
    expect(
      getSeverity(`0: 3
1: 2
4: 4
6: 4`)
    ).toBe(24);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day13.txt", "utf8", (err, data) => {
      expect(getSeverity(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("getDelay", () => {
  it("should return the delay", () => {
    expect(
      getDelay(`0: 3
1: 2
4: 4
6: 4`)
    ).toBe(10);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day13.txt", "utf8", (err, data) => {
      expect(getDelay(data)).toMatchSnapshot();
      done();
    });
  });
});
