const _ = require("lodash");

const isValid = input => {
  const words = input.split(/\s/);
  return (
    _(words)
      .countBy()
      .values()
      .max() === 1
  );
};

const isValid2 = input => {
  const words = input.split(/\s/);
  return (
    _(words)
      .map(word => _.sortBy(word).join(""))
      .countBy()
      .values()
      .max() === 1
  );
};

const countPassphrase = input => {
  return _.compact(input.split(/\n/).map(isValid)).length;
};

const countPassphrase2 = input => {
  return _.compact(input.split(/\n/).map(isValid2)).length;
};

module.exports = {
  countPassphrase,
  isValid,
  countPassphrase2,
  isValid2
};
