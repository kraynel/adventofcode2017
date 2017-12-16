const _ = require("lodash");

const getInitialArray = size => {
  return Array.from(Array(size).keys()).map(index =>
    String.fromCharCode("a".charCodeAt(0) + index)
  );
};

const spin = (values, spin) => {
  const beginning = values.splice(values.length - spin, spin);
  return beginning.concat(values);
};

const exchange = (values, index1, index2) => {
  const tmp = values[index2];
  values[index2] = values[index1];
  values[index1] = tmp;
  return values;
};

const partner = (values, letter1, letter2) => {
  return exchange(
    values,
    _.indexOf(values, letter1),
    _.indexOf(values, letter2)
  );
};

const letsDance = (input, size = 16) => {
  let val = getInitialArray(size);
  input.split(",").forEach(move => {
    switch (move[0]) {
      case "s":
        val = spin(val, parseInt(move.substring(1), 10));
        break;
      case "x": {
        let [left, right] = move.substring(1).split("/");
        val = exchange(val, parseInt(left, 10), parseInt(right, 10));
        break;
      }
      case "p": {
        let [left, right] = move.substring(1).split("/");
        val = partner(val, left, right);
        break;
      }
    }
  });
  return val.join("");
};

const letsDanceWithInput = (input, inputString) => {
  let val = inputString.split("");
  input.split(",").forEach(move => {
    switch (move[0]) {
      case "s":
        val = spin(val, parseInt(move.substring(1), 10));
        break;
      case "x": {
        let [left, right] = move.substring(1).split("/");
        val = exchange(val, parseInt(left, 10), parseInt(right, 10));
        break;
      }
      case "p": {
        let [left, right] = move.substring(1).split("/");
        val = partner(val, left, right);
        break;
      }
    }
  });
  return val.join("");
};

module.exports = { letsDance, letsDanceWithInput };
