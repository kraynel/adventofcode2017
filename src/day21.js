const _ = require('lodash');
const initialGrid = ['.#.', '..#', '###'];

const rotate = matrixOrig => {
  const matrix = _.map(matrixOrig, line => line.split(''));
  var n = matrix.length;
  for (var i = 0; i < n / 2; i++) {
    for (var j = 0; j < Math.floor(n / 2); j++) {
      var temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = temp;
    }
  }
  return matrix.map(line => line.join(''));
};

const flip = matrix => {
  return matrix.map(line =>
    _(line)
      .split('')
      .reverse()
      .join('')
  );
};
const parseInput = input => {
  return input.split(/\n/).map(line => {
    const [before, after] = line.split(/ => /);
    return {
      before: before.split(/\//),
      after: after.split(/\//)
    };
  });
};

const patternMatches = (grid, pattern) => {
  const rot1 = rotate(pattern);
  const rot2 = rotate(rot1);
  const rot3 = rotate(rot2);
  const possiblesMatches = [
    pattern,
    rot1,
    rot2,
    rot3,
    flip(pattern),
    flip(rot1),
    flip(rot2),
    flip(rot3)
  ];

  return _.find(possiblesMatches, patt => {
    const res = _(grid)
      .map((line, index) => _.isEqual(line, patt[index]))
      .every();
    return res;
  });
};

const findTransformation = (grid, transformations) => {
  return _.find(transformations, transfo => {
    if (grid.length !== transfo.before.length) return false;
    return patternMatches(grid, transfo.before);
  });
};

const getNextGrid = (grid, transformations) => {
  const smallSize = grid.length % 2 === 0 ? 2 : 3;
  const largeGrid = [];
  const largeGridSize = grid.length / smallSize * (smallSize + 1);

  for (let i = 0; i < grid.length; i += smallSize) {
    for (let j = 0; j < grid.length; j += smallSize) {
      let smallGrid = [];
      if (smallSize === 2) {
        smallGrid[0] = `${grid[i][j]}${grid[i][j + 1]}`;
        smallGrid[1] = `${grid[i + 1][j]}${grid[i + 1][j + 1]}`;
      } else {
        smallGrid[0] = `${grid[i][j]}${grid[i][j + 1]}${grid[i][j + 2]}`;
        smallGrid[1] = `${grid[i + 1][j]}${grid[i + 1][j + 1]}${
          grid[i + 1][j + 2]
        }`;
        smallGrid[2] = `${grid[i + 2][j]}${grid[i + 2][j + 1]}${
          grid[i + 2][j + 2]
        }`;
      }

      const transformed = findTransformation(smallGrid, transformations).after;
      largeGrid.push(transformed);
    }
  }

  //   console.log(largeGrid);
  const gridByLines = _.chunk(largeGrid, largeGridSize / (smallSize + 1));
  //   console.log(gridByLines);
  // grid by lines is an array of largeGridSize arrays,
  // each being an array of string to concat
  const afterMap = gridByLines.map(groupsOfLines => {
    const lines = _.fill(new Array(smallSize + 1), '');
    const reduced = groupsOfLines.reduce((accu, groupOfLines) => {
      groupOfLines.forEach((line, index) => {
        lines[index] = lines[index].concat(line);
      });
      return lines;
    }, lines);
    return reduced;
  });
  return _.flattenDeep(afterMap);
};

module.exports = { initialGrid, getNextGrid, parseInput };
