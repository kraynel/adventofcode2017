const _ = require("lodash");

const getDistance = input => {
  let squareSize = Math.ceil(Math.sqrt(input));
  if (squareSize % 2 === 0) squareSize++;

  const bottomRight = squareSize * squareSize;
  const middles = [
    bottomRight - (squareSize - 1) / 2 - (squareSize - 1) * 3,
    bottomRight - (squareSize - 1) / 2 - (squareSize - 1) * 2,
    bottomRight - (squareSize - 1) / 2 - (squareSize - 1),
    bottomRight - (squareSize - 1) / 2
  ];
  const closests = middles.map(middle => Math.abs(middle - input));
  return _.min(closests) + (squareSize - 1) / 2;
};

module.exports = {
  getDistance
};
