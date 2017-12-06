const _ = require("lodash");

const getCycleNumbers = input => {
  const previous = [];

  let parsedInput = input.split(" ").map(v => parseInt(v));
  while (!_.find(previous, v => v === parsedInput.join(" "))) {
    previous.push(parsedInput.join(" "));
    let max = _.max(parsedInput);
    const maxIndex = _.findIndex(parsedInput, v => v === max);

    parsedInput[maxIndex] = 0;
    let i = maxIndex + 1;
    while (max > 0) {
      parsedInput[i % parsedInput.length]++;
      i++;
      max--;
    }
  }

  return previous.length;
};

const getCycleLength = input => {
  const previous = [];

  let parsedInput = input.split(" ").map(v => parseInt(v));
  while (!_.find(previous, v => v === parsedInput.join(" "))) {
    previous.push(parsedInput.join(" "));
    let max = _.max(parsedInput);
    const maxIndex = _.findIndex(parsedInput, v => v === max);

    parsedInput[maxIndex] = 0;
    let i = maxIndex + 1;
    while (max > 0) {
      parsedInput[i % parsedInput.length]++;
      i++;
      max--;
    }
  }

  return (
    previous.length - _.findIndex(previous, v => v === parsedInput.join(" "))
  );
};

module.exports = {
  getCycleNumbers,
  getCycleLength
};
