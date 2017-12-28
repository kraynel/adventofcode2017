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
  return mulCounter;
};

var eratosthenes = function(n) {
  // Eratosthenes algorithm to find all primes under n
  const upperLimit = Math.sqrt(n);
  const array = Array(n).fill(true);

  // Remove multiples of primes starting from 2, 3, 5,...
  for (var i = 2; i <= upperLimit; i++) {
    if (array[i]) {
      for (var j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }

  const output = [];
  // All array[i] set to true are primes
  for (var i = 2; i < n; i++) {
    if (array[i]) {
      output.push(i);
    }
  }

  return output;
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

  const era = eratosthenes(c);
  do {
    if (!era.includes(b)) {
      h = h + 1;
    }

    b += 17;
  } while (b <= c);

  return h;
};

module.exports = { executeProgram, executeSmart };
