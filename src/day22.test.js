const { countInfectionBurst } = require("./day22");
const fs = require("fs");

const testMap = `..#
#..
...`;

describe("countInfectionBurst", () => {
  it("should countInfectionBurst", () => {
    expect(countInfectionBurst(testMap, 7)).toBe(5);
    expect(countInfectionBurst(testMap, 70)).toBe(41);
    expect(countInfectionBurst(testMap, 10000)).toBe(5587);
  });
});
