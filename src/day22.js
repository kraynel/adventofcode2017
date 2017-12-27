const _ = require("lodash");

const countInfectionBurst = (input, rounds) => {
  const infections = {};
  const width = input.split(/\n/).length - 1;
  input.split(/\n/).forEach((line, indexLine) => {
    line.split("").forEach((char, indexChar) => {
      if (char === "#") {
        infections[`${indexLine - width / 2},${indexChar - width / 2}`] = true;
      }
    });
  });

  let newInfections = 0;
  let posX = 0;
  let posY = 0;
  let dir = 0;
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ];

  for (let round = 0; round < rounds; round++) {
    const isInfected = infections[`${posY},${posX}`];
    if (isInfected) {
      dir = (dir + 1) % 4;
      delete infections[`${posY},${posX}`];
    } else {
      dir = (dir + 3) % 4;
      infections[`${posY},${posX}`] = true;
      newInfections++;
    }
    posX += directions[dir].x;
    posY += directions[dir].y;
  }

  return newInfections;
};

module.exports = { countInfectionBurst };
