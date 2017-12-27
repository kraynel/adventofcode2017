const _ = require("lodash");

const DIRECTIONS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

const parseInput = input => {
  const infections = {};
  const width = input.split(/\n/).length - 1;
  input.split(/\n/).forEach((line, indexLine) => {
    line.split("").forEach((char, indexChar) => {
      if (char === "#") {
        infections[`${indexLine - width / 2},${indexChar - width / 2}`] = "#";
      }
    });
  });
  return infections;
};
const countInfectionBurst = (input, rounds) => {
  const infections = parseInput(input);
  let newInfections = 0;
  let posX = 0;
  let posY = 0;
  let dir = 0;

  for (let round = 0; round < rounds; round++) {
    const isInfected = infections[`${posY},${posX}`] === "#";
    if (isInfected) {
      dir = (dir + 1) % 4;
      delete infections[`${posY},${posX}`];
    } else {
      dir = (dir + 3) % 4;
      infections[`${posY},${posX}`] = "#";
      newInfections++;
    }
    posX += DIRECTIONS[dir].x;
    posY += DIRECTIONS[dir].y;
  }

  return newInfections;
};

const countEvolved = (input, rounds) => {
  const STATUSES = ["W", "#", "F"];
  const infections = parseInput(input);
  let newInfections = 0;
  let posX = 0;
  let posY = 0;
  let dir = 0;

  for (let round = 0; round < rounds; round++) {
    if (infections[`${posY},${posX}`] === "#") {
      dir = (dir + 1) % 4;
      infections[`${posY},${posX}`] = "F";
    } else if (infections[`${posY},${posX}`] === "W") {
      infections[`${posY},${posX}`] = "#";
      newInfections++;
    } else if (infections[`${posY},${posX}`] === "F") {
      dir = (dir + 2) % 4;
      delete infections[`${posY},${posX}`];
    } else {
      dir = (dir + 3) % 4;
      infections[`${posY},${posX}`] = "W";
    }

    posX += DIRECTIONS[dir].x;
    posY += DIRECTIONS[dir].y;
  }

  return newInfections;
};
module.exports = { countInfectionBurst, countEvolved };
