const _ = require("lodash");

const getChecksumByRow = row => {
  const inputArray = row.split(" ").map(a => parseInt(a));
  return _.max(inputArray) - _.min(inputArray);
};

const getChecksum = input => {
  return input
    .split(/\n/)
    .map(row => getChecksumByRow(row))
    .reduce((accu, value) => accu + value, 0);
};

module.exports = {
  getChecksum
};
