const _ = require("lodash");

const largestRegister = input => {
  const lines = input.split(/\n/);
  const parseLine = /(.*?) (.*?) (.*?) if (.*?) (.*?) (.*)/;
  const operations = lines.map(line => {
    const [unused, left, op, right, cLeft, test, val] = parseLine.exec(line);
    return {
      left,
      op,
      right: parseInt(right),
      cLeft,
      test,
      val: parseInt(val)
    };
  });

  const registers = {};
  let allTimeMax = 0;
  operations.forEach(({ left, op, right, cLeft, test, val }) => {
    if (!registers[cLeft]) registers[cLeft] = 0;
    if (!registers[left]) registers[left] = 0;

    const cLeftValue = registers[cLeft];
    const check = eval(`${cLeftValue} ${test} ${val}`);
    if (check) {
      if (op === "inc") {
        registers[left] += right;
      } else {
        registers[left] -= right;
      }

      allTimeMax = Math.max(allTimeMax, _.max(Object.values(registers)));
    }
  });
  return {
    max: _.max(Object.values(registers)),
    allTimeMax
  };
};

module.exports = { largestRegister };
