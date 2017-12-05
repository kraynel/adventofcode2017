const _ = require("lodash");

const getChecksumByRow = row => {
  const inputArray = row.split(/\s/).map(a => parseInt(a));
  return _.max(inputArray) - _.min(inputArray);
};

const getChecksum = input => {
  return input
    .split(/\n/)
    .map(row => getChecksumByRow(row))
    .reduce((accu, value) => accu + value, 0);
};

const getChecksumByRow2 = row => {
  const inputArray = _(row)
    .split(/\s/)
    .map(a => parseInt(a))
    .sortBy()
    .reverse()
    .value();
  return _(inputArray)
    .map((value, index) => {
      const divisor = _.find(inputArray, d => value % d === 0, index + 1);
      if (divisor) {
        return value / divisor;
      }
    })
    .compact()
    .first();
};

const getChecksum2 = input => {
  return input
    .split(/\n/)
    .map(row => getChecksumByRow2(row))
    .reduce((accu, value) => accu + value, 0);
};

module.exports = {
  getChecksum,
  getChecksum2
};
