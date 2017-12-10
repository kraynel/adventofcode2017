const _ = require("lodash");

const mod = (n, m) => (n % m + m) % m;

const rotateList = (list, n) =>
  list
    .slice(n % list.length, list.length)
    .concat(list.slice(0, mod(n, list.length)));

const computeHash = (listLength, input) => {
  let moves = input.split(/[^0-9]+/).map(i => parseInt(i));
  let circularList = Array.from(Array(listLength), (d, i) => i);

  return computeKnotHash(circularList, moves).check;
};

const computeKnotHash = (circularList, moves, position = 0, skip = 0) => {
  moves.forEach(move => {
    const tempList = rotateList(circularList, position);

    const toReverse = tempList.splice(0, move);
    const reversed = toReverse.reverse();
    tempList.splice(0, 0, ...reversed);
    circularList = rotateList(tempList, -position);

    position += move + skip;
    skip++;
  });

  return {
    circularList,
    check: circularList[0] * circularList[1],
    position,
    skip
  };
};

const inputToAscii = input => [
  ...input.split("").map(i => i.charCodeAt(0)),
  17,
  31,
  73,
  47,
  23
];

const getFullHash = input => {
  const moves = inputToAscii(input);
  let circularList = Array.from(Array(256), (d, i) => i);
  let position = 0;
  let skip = 0;
  for (let round = 0; round < 64; round++) {
    const roundResult = computeKnotHash(circularList, moves, position, skip);
    circularList = roundResult.circularList;
    position = roundResult.position;
    skip = roundResult.skip;
  }

  return circularList;
};

const getPrintableHexHash = values => {
  return _(values)
    .chunk(16)
    .map(chunk => chunk.reduce((accu, v) => (accu ^= v), 0))
    .map(decimal => _.padStart(decimal.toString(16), 2, "0"))
    .join("");
};

const computeFullHash = input => getPrintableHexHash(getFullHash(input));

module.exports = {
  computeHash,
  computeFullHash
};
