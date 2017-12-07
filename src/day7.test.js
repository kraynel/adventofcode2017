const { getRootNode } = require("./day7");
const fs = require("fs");

describe("getRootNode", () => {
  it("should get the root node", () => {
    expect(
      getRootNode(`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`)
    ).toBe("tknk");
  });

  it("should get the value", done => {
    fs.readFile("inputs/day7.txt", "utf8", (err, data) => {
      expect(getRootNode(data)).toMatchSnapshot();
      done();
    });
  });
});
