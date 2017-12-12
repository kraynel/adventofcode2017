const { countConnected, countGroups } = require("./day12");
const fs = require("fs");
const _ = require("lodash");

describe("countConnected", () => {
  it("should build a tree", () => {
    expect(
      countConnected(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`)
    ).toBe(6);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day12.txt", "utf8", (err, data) => {
      expect(countConnected(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("countGroups", () => {
  it("should count the connected groups", () => {
    expect(
      countGroups(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`)
    ).toBe(2);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day12.txt", "utf8", (err, data) => {
      expect(countGroups(data)).toMatchSnapshot();
      done();
    });
  });
});
