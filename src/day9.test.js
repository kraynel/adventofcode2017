const {
  removeEscapes,
  removeGarbage,
  scoreGroups,
  countGarbage
} = require("./day9");
const fs = require("fs");

describe("removeEscapes", () => {
  it("should remove escapes", () => {
    expect(removeEscapes("<{!>}>")).toBe("<{}>");
    expect(removeEscapes("<!!>")).toBe("<>");
    expect(removeEscapes("<!!!>>")).toBe("<>");
    expect(removeEscapes('<{o"i!a,<{i<a>')).toBe('<{o"i,<{i<a>');
  });
});

describe("removeGarbage", () => {
  it("should remove garbage", () => {
    expect(removeGarbage("<{!>}>")).toBe("");
    expect(removeGarbage("<!!>")).toBe("");
    expect(removeGarbage("<!!!>>")).toBe("");
    expect(removeGarbage('<{o"i!a,<{i<a>')).toBe("");

    expect(removeGarbage("{}")).toBe("{}");
    expect(removeGarbage("{{{}}}")).toBe("{{{}}}");
    expect(removeGarbage("{{},{}}")).toBe("{{},{}}");
    expect(removeGarbage("{{{},{},{{}}}}")).toBe("{{{},{},{{}}}}");
    expect(removeGarbage("{<{},{},{{}}>}")).toBe("{}");
    expect(removeGarbage("{<a>,<a>,<a>,<a>}")).toBe("{,,,}");
    expect(removeGarbage("{{<a>},{<a>},{<a>},{<a>}}")).toBe("{{},{},{},{}}");
    expect(removeGarbage("{{<!>},{<!>},{<!>},{<a>}}")).toBe("{{}}");
  });
});

describe("scoreGroups", () => {
  it("should score the groups", () => {
    expect(scoreGroups("{}")).toBe(1);
    expect(scoreGroups("{{{}}}")).toBe(6);
    expect(scoreGroups("{{},{}}")).toBe(5);
    expect(scoreGroups("{{{},{},{{}}}}")).toBe(16);
    expect(scoreGroups("{<{},{},{{}}>}")).toBe(1);
    expect(scoreGroups("{<a>,<a>,<a>,<a>}")).toBe(1);
    expect(scoreGroups("{{<ab>},{<ab>},{<ab>},{<ab>}}")).toBe(9);
    expect(scoreGroups("{{<!!>},{<!!>},{<!!>},{<!!>}}")).toBe(9);
    expect(scoreGroups("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toBe(3);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day9.txt", "utf8", (err, data) => {
      expect(scoreGroups(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("countGarbage", () => {
  it("should count the garbage", () => {
    expect(countGarbage("<>")).toBe(0);
    expect(countGarbage("<random characters>")).toBe(17);
    expect(countGarbage("<<<<>")).toBe(3);
    expect(countGarbage("<{!>}>")).toBe(2);
    expect(countGarbage("<!!>")).toBe(0);
    expect(countGarbage("<!!!>>")).toBe(0);
    expect(countGarbage('<{o"i!a,<{i<a>')).toBe(10);
    expect(countGarbage('<{o"i!a,<{i<a><{!>}>')).toBe(12);
  });

  it("should get garbage length", done => {
    fs.readFile("inputs/day9.txt", "utf8", (err, data) => {
      expect(countGarbage(data)).toMatchSnapshot();
      done();
    });
  });
});
