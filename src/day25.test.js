const { executeProgram } = require("./day25");
const fs = require("fs");

describe("executeProgram", () => {
  it("should get the debug value", () => {
    expect(
      executeProgram(`Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`)
    ).toBe(3);
  });

  it("should get the value", done => {
    fs.readFile("inputs/day25.txt", "utf8", (err, data) => {
      expect(executeProgram(data)).toMatchSnapshot();
      done();
    });
  });
});
