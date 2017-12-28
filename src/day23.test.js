const { executeProgram, executeSmart } = require("./day23");
const fs = require("fs");

describe("executeProgram", () => {
  it("should get the debug value", done => {
    fs.readFile("inputs/day23.txt", "utf8", (err, data) => {
      expect(executeProgram(data)).toMatchSnapshot();
      console.log(executeSmart());
      done();
    });
  });

  // it("should get the non debug value", done => {
  //   fs.readFile("inputs/day23.txt", "utf8", (err, data) => {
  //     expect(executeProgram(data, false)).toMatchSnapshot();
  //     done();
  //   });
  // });
});
