const { countSteps, reduceSteps, countDistance } = require("./day11");
const fs = require("fs");
const _ = require("lodash");

describe("countSteps", () => {
  it("should return the total of each step", () => {
    expect(countSteps("ne,ne,ne")).toEqual({
      n: 0,
      s: 0,
      ne: 3,
      nw: 0,
      se: 0,
      sw: 0
    });
    expect(countSteps("ne,ne,sw,sw")).toEqual({
      n: 0,
      s: 0,
      ne: 2,
      nw: 0,
      se: 0,
      sw: 2
    });
  });

  it("should get the value", done => {
    fs.readFile("inputs/day11.txt", "utf8", (err, data) => {
      const steps = countSteps(data);
      expect(steps).toMatchSnapshot();
      expect(reduceSteps(steps)).toMatchSnapshot();
      expect(countDistance(steps)).toMatchSnapshot();

      const cumulativeSteps = {
        n: 0,
        s: 0,
        ne: 0,
        nw: 0,
        se: 0,
        sw: 0
      };
      const distances = data.split(",").map(value => {
        cumulativeSteps[value]++;
        return countDistance(cumulativeSteps);
      });
      expect(_.max(distances)).toMatchSnapshot();
      done();
    });
  });
});
