const { initialGrid, getNextGrid, parseInput } = require('./day21');
const fs = require('fs');

describe('getNextGrid', () => {
  it('should getNextGrid', () => {
    const transformations = parseInput(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`);
    expect(getNextGrid(initialGrid, transformations)).toEqual([
      '#..#',
      '....',
      '....',
      '#..#'
    ]);
  });

  it('should getNextGrid', () => {
    const transformations = parseInput(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`);
    expect(
      getNextGrid(['....', '.#.#', '....', '.#.#'], transformations)
    ).toEqual(['##.##.', '#..#..', '......', '##.##.', '#..#..', '......']);
  });

  it('should get the value', done => {
    fs.readFile('inputs/day21.txt', 'utf8', (err, data) => {
      const transformations = parseInput(data);

      const grids = [initialGrid];
      while (grids.length < 6) {
        grids.push(getNextGrid(grids[grids.length - 1], transformations));
      }

      const finalGrid = grids[grids.length - 1];
      expect(
        finalGrid
          .join('')
          .split('')
          .filter(a => a === '#').length
      ).toMatchSnapshot();
      done();
    });
  });

  it.skip('should get the value', done => {
    fs.readFile('inputs/day21.txt', 'utf8', (err, data) => {
      const transformations = parseInput(data);

      let iteration = 0;
      let nextGrid = initialGrid;
      while (iteration < 18) {
        iteration++;
        nextGrid = getNextGrid(nextGrid, transformations);
      }

      const finalGrid = nextGrid;
      expect(
        finalGrid
          .join('')
          .split('')
          .filter(a => a === '#').length
      ).toMatchSnapshot();
      done();
    });
  });
});
