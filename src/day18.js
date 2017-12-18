const _ = require("lodash");

const getValue = (registers, val) => {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(val)) return Number(val);
  return registers[val];
};
const executeProgram = input => {
  const instructions = input.split(/\n/).map(exec => exec.split(" "));
  let pointer = 0;
  const registers = {};
  let lastSound = null;

  while (pointer >= 0 && pointer < instructions.length) {
    const nextInstruction = instructions[pointer];
    switch (nextInstruction[0]) {
      case "snd":
        lastSound = getValue(registers, nextInstruction[1]);
        pointer++;
        break;
      case "set":
        registers[nextInstruction[1]] = getValue(registers, nextInstruction[2]);
        pointer++;
        break;
      case "add":
        registers[nextInstruction[1]] += getValue(
          registers,
          nextInstruction[2]
        );
        pointer++;
        break;
      case "mul":
        registers[nextInstruction[1]] *= getValue(
          registers,
          nextInstruction[2]
        );
        pointer++;
        break;
      case "mod":
        registers[nextInstruction[1]] %= getValue(
          registers,
          nextInstruction[2]
        );
        pointer++;
        break;
      case "rcv":
        if (getValue(registers, nextInstruction[1]) > 0) {
          return lastSound;
        } else pointer++;
        break;
      case "jgz":
        if (getValue(registers, nextInstruction[1]) > 0) {
          pointer += getValue(registers, nextInstruction[2]);
        } else pointer++;
        break;
    }
  }
  return;
};

module.exports = { executeProgram };
