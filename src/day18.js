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

const executeProgramWithSend = (
  instructions,
  registers,
  pointer = 0,
  sendBuffer = [],
  receiveBuffer = []
) => {
  while (pointer >= 0 && pointer < instructions.length) {
    const nextInstruction = instructions[pointer];
    switch (nextInstruction[0]) {
      case "snd":
        registers.sendValue++;
        sendBuffer.push(getValue(registers, nextInstruction[1]));
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
        if (receiveBuffer.length != 0) {
          registers[nextInstruction[1]] = receiveBuffer.shift();
          pointer++;
        } else {
          return {
            registers,
            pointer,
            sendBuffer,
            receiveBuffer,
            isWaiting: true
          };
        }
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

const executeInParallel = input => {
  const instructions = input.split(/\n/).map(exec => exec.split(" "));
  let registers = [{ p: 0, sendValue: 0 }, { p: 1, sendValue: 0 }];
  let pointers = [0, 0];
  let queues = [[], []];

  let index = 0;
  while (true) {
    if (_.every(registers, "skipped")) break;

    const nextInstruction = instructions[pointers[index]];
    if (nextInstruction[0] === "rcv" && _.isEmpty(queues[(index + 1) % 2])) {
      registers[index].skipped = true;
    } else {
      registers[index].skipped = false;
      let results = executeProgramWithSend(
        instructions,
        registers[index],
        pointers[index],
        queues[index],
        queues[(index + 1) % 2]
      );
      if (!results.isWaiting) {
        console.log("Program", index, "has terminated");
      }
      pointers[index] = results.pointer;
    }

    index = (index + 1) % 2;
  }

  return registers[1].sendValue;
};

module.exports = { executeProgram, executeInParallel };
