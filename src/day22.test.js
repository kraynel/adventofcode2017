const { countInfectionBurst } = require("./day22");
const fs = require("fs");

const testMap = `..#
#..
...`;

describe("countInfectionBurst", () => {
  it("should countInfectionBurst", () => {
    expect(countInfectionBurst(testMap, 0)).toBe(0);
    expect(countInfectionBurst(testMap, 1)).toBe(1);
    expect(countInfectionBurst(testMap, 7)).toBe(5);
    expect(countInfectionBurst(testMap, 70)).toBe(41);
    expect(countInfectionBurst(testMap, 10000)).toBe(5587);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day22.txt", "utf8", (err, data) => {
      expect(countInfectionBurst(data, 10000)).toMatchSnapshot();
      done();
    });
  });
});
