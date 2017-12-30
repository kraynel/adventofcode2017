const _ = require("lodash");

const getFunction = (write, move, next) => {
  return ({ tape, cursor, currentState }) => {
    tape[cursor] = write;
    let nextCursor = -1;

    if (move === "right") {
      if (cursor === tape.length - 1) tape.push("0");
      nextCursor = cursor + 1;
    } else {
      if (cursor === 0) {
        tape.unshift("0");
        cursor = 1;
      }
      nextCursor = cursor - 1;
    }

    return { tape, cursor: nextCursor, currentState: next };
  };
};
const parseInput = input => {
  let lines = input.split(/\n/);
  const initialState = /Begin in state ([A-Z]+)\./gi.exec(lines.shift())[1];
  const steps = parseInt(
    /Perform a diagnostic checksum after ([0-9]+) steps\./.exec(
      lines.shift()
    )[1],
    10
  );
  lines = lines.filter(line => line.trim() !== "");
  const states = _(lines)
    .chunk(9)
    .map(state => {
      const stateName = /In state ([A-Z]+):/gi.exec(state[0])[1];

      const writeOnZero = /Write the value (0|1)./gi.exec(state[2])[1];
      const moveOnZero = /Move one slot to the (left|right)./gi.exec(
        state[3]
      )[1];
      const nextOnZero = /Continue with state ([A-Z]+)/gi.exec(state[4])[1];

      const writeOnOne = /Write the value (0|1)./gi.exec(state[6])[1];
      const moveOnOne = /Move one slot to the (left|right)./gi.exec(
        state[7]
      )[1];
      const nextOnOne = /Continue with state ([A-Z]+)/gi.exec(state[8])[1];

      return {
        stateName,
        onZero: getFunction(writeOnZero, moveOnZero, nextOnZero),
        onOne: getFunction(writeOnOne, moveOnOne, nextOnOne)
      };
    })
    .keyBy("stateName")
    .value();

  return { transitions: states, initialState, steps };
};

const executeProgram = input => {
  let { transitions, initialState, steps } = parseInput(input);
  let state = { tape: ["0"], cursor: 0, currentState: initialState };

  for (let i = 0; i < steps; i++) {
    if (state.tape[state.cursor] === "0") {
      state = transitions[state.currentState].onZero(state);
    } else {
      state = transitions[state.currentState].onOne(state);
    }
  }

  return state.tape.filter(i => i === "1").length;
};

module.exports = { executeProgram };
