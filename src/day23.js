const getValue = (registers, val) => {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(val)) return Number(val);
  return registers[val];
};

const executeProgram = (input, debug = true) => {
  const instructions = input.split(/\n/).map(exec => exec.split(" "));
  let pointer = 0;
  let mulCounter = 0;
  const registers = {
    a: debug ? 0 : 1,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0
  };

  while (pointer >= 0 && pointer < instructions.length) {
    const nextInstruction = instructions[pointer];
    switch (nextInstruction[0]) {
      case "set":
        registers[nextInstruction[1]] = getValue(registers, nextInstruction[2]);
        pointer++;
        break;
      case "sub":
        registers[nextInstruction[1]] -= getValue(
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
        mulCounter++;
        pointer++;
        break;
      case "jnz":
        if (getValue(registers, nextInstruction[1]) !== 0) {
          pointer += getValue(registers, nextInstruction[2]);
        } else pointer++;
        break;
    }
  }
  console.log(registers);
  return mulCounter;
};

const isPrime = b => {
  for (let i = 2, s = Math.sqrt(b); i <= s; i++) {
    if (b % i === 0) return false;
  }
  return b !== 1;
};

const executeSmart = (debug = true) => {
  let a = debug ? 0 : 1;
  let b = 57;
  let c = 57;
  let d = 0;
  let e = 0;
  let f = 0;
  let g = 0;
  let h = 0;

  if (a != 0) {
    b = 105700;
    c = 122700;
  }

  do {
    if (!isPrime(b)) {
      h = h + 1;
    }

    if (b != c) b = b + 17;

    // 1000 times
  } while (b != c);

  console.log({ a, b, c, d, e, f, g, h });
  return h;
};
module.exports = { executeProgram, executeSmart };
