const insertIntoRing = (ring, position, newValue, skip = 3) => {
  const nextPosition = (position + skip) % ring.length;
  ring.splice(nextPosition + 1, 0, newValue);
  return nextPosition + 1;
};

const getNextValue = (ringSize, skip) => {
  const ring = [0];
  let position = 0;
  let nextValue = 1;
  while (ring.length < ringSize) {
    position = insertIntoRing(ring, position, nextValue, skip);
    nextValue++;
  }
  return ring[(position + 1) % ringSize];
};

const getValueAfterZero = (ringSize, skip) => {
  let position = 0;
  let nextValue = 1;
  let valueAfterZero = 0;
  while (nextValue < ringSize) {
    const nextPosition = (position + skip) % nextValue;
    if (nextPosition === 0) valueAfterZero = nextValue;

    position = nextPosition + 1;
    nextValue++;
  }
  return valueAfterZero;
};

module.exports = { getNextValue, getValueAfterZero };
