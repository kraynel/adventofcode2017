const { getClosestToZero, getParticlesAfterCollision } = require("./day20");
const fs = require("fs");

describe("getClosestToZero", () => {
  it("should getClosestToZero", () => {
    expect(
      getClosestToZero(`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`)
    ).toBe(0);

    expect(
      getClosestToZero(`p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>`)
    ).toBe(1);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day20.txt", "utf8", (err, data) => {
      expect(getClosestToZero(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("getParticlesAfterCollision", () => {
  it("should getParticlesAfterCollision", () => {
    expect(
      getParticlesAfterCollision(`p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`)
    ).toBe(1);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day20.txt", "utf8", (err, data) => {
      expect(getParticlesAfterCollision(data)).toMatchSnapshot();
      done();
    });
  });
});
