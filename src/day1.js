const getHash = input => {
  const inputArray = input.split("");
  inputArray.push(inputArray[0]);
  return inputArray.reduce((accu, value, index) => {
    if (index + 1 > inputArray.length) return accu;
    if (value === inputArray[index + 1]) return parseInt(value) + accu;
    return accu;
  }, 0);
};

module.exports = {
  getHash
};
