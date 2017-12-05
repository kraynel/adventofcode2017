const getNumberOfSteps = input => {
  const steps = input.split(/\n/).map(v => parseInt(v));

  let cursor = 0;
  let accu = 0;
  while (cursor < steps.length && cursor >= 0) {
    const newCursor = cursor + steps[cursor];
    steps[cursor]++;
    cursor = newCursor;
    accu++;
  }
  return accu;
};

module.exports = {
  getNumberOfSteps
};
