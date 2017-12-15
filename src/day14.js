const _ = require("lodash");
const { computeFullHash } = require("./day10");

const hex2Count = {
  "0": 0, // 0000
  "1": 1, // 0001
  "2": 1, // 0010
  "3": 2, // 0011
  "4": 1, // 0100
  "5": 2, // 0101
  "6": 2, // 0110
  "7": 3, // 0111
  "8": 1, // 1000
  "9": 2, // 1001
  a: 2, // 1010
  b: 3, // 1011
  c: 2, // 1100
  d: 3, // 1101
  e: 3, // 1110
  f: 4 // 1111
};

const hex2Bin = {
  "0": "0000",
  "1": "000#",
  "2": "00#0",
  "3": "00##",
  "4": "0#00",
  "5": "0#0#",
  "6": "0##0",
  "7": "0###",
  "8": "#000",
  "9": "#00#",
  a: "#0#0",
  b: "#0##",
  c: "##00",
  d: "##0#",
  e: "###0",
  f: "####"
};

const countBits = input => {
  return Array.from(Array(128).keys())
    .map(v => {
      const hash = computeFullHash(`${input}-${v}`);
      return _.sum(hash.split("").map(letter => hex2Count[letter]));
    })
    .reduce((accu, v) => accu + v, 0);
};

const countIslands = input => {
  // Make a bool array to mark visited cells.
  // Initially all cells are unvisited
  const visited = Array.from(Array(128).keys()).map(v =>
    Array(128).fill(false)
  );
  const data = Array.from(Array(128).keys()).map(v => {
    const hash = computeFullHash(`${input}-${v}`);
    return hash
      .split("")
      .map(letter => hex2Bin[letter])
      .join("");
  });

  let count = 0;
  for (let i = 0; i < 128; ++i)
    for (let j = 0; j < 128; ++j)
      if (data[i][j] === "#" && !visited[i][j]) {
        DFS(data, i, j, visited);
        ++count;
      }

  return count;
};

const isSafe = (data, row, col, visited) => {
  return (
    row >= 0 &&
    row < 128 &&
    col >= 0 &&
    col < 128 &&
    (data[row][col] === "#" && !visited[row][col])
  );
};

const DFS = (data, row, col, visited) => {
  const rowNbr = [-1, 0, 0, 1];
  const colNbr = [0, -1, 1, 0];
  visited[row][col] = true;

  for (let k = 0; k < 4; ++k)
    if (isSafe(data, row + rowNbr[k], col + colNbr[k], visited))
      DFS(data, row + rowNbr[k], col + colNbr[k], visited);
};

module.exports = { countBits, countIslands };
