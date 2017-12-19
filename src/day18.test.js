const { executeProgram, executeInParallel } = require("./day18");
const fs = require("fs");

describe("executeProgram", () => {
  it("should get the transmitted value", () => {
    expect(
      executeProgram(`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`)
    ).toBe(4);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day18.txt", "utf8", (err, data) => {
      expect(executeProgram(data)).toMatchSnapshot();
      done();
    });
  });
});

describe("executeProgram", () => {
  it("should get the transmitted value", () => {
    expect(
      executeInParallel(`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`)
    ).toBe(3);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day18.txt", "utf8", (err, data) => {
      expect(executeInParallel(data)).toMatchSnapshot();
      done();
    });
  });
});
