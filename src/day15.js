const judge = (a, b) => {
  const onlyLastBits = 0b11111111111111110000000000000000;
  return (a | onlyLastBits) === (b | onlyLastBits);
};

const getFinalCount = (previousA, previousB) => {
  const factorA = 16807;
  const factorB = 48271;
  const modulo = 2147483647;

  let count = 0;
  let generatorA = previousA;
  let generatorB = previousB;
  for (let i = 0; i < 40000000; i++) {
    generatorA = (factorA * generatorA) % modulo;
    generatorB = (factorB * generatorB) % modulo;
    if (judge(generatorA, generatorB)) count++;
  }
  return count;
};

const getNextValue = (factor, generator, constraint) => {
  const modulo = 2147483647;
  let nextValue = generator;

  do {
    nextValue = (factor * nextValue) % modulo;
  } while (nextValue % constraint != 0);
  return nextValue;
};

const getFinalCount2 = (previousA, previousB) => {
  const factorA = 16807;
  const factorB = 48271;
  const modulo = 2147483647;

  let count = 0;
  let generatorA = previousA;
  let generatorB = previousB;
  for (let i = 0; i < 5000000; i++) {
    generatorA = getNextValue(factorA, generatorA, 4);
    generatorB = getNextValue(factorB, generatorB, 8);
    if (judge(generatorA, generatorB)) count++;
  }
  return count;
};

module.exports = { getFinalCount, getFinalCount2 };
