const getLetters = input => {
  const direction = { x: 0, y: 1 };
  const lines = input.split(/\n/);
  const letters = [];
  const position = { x: lines[0].split("").findIndex(v => v === "|"), y: 0 };
  let nextChar = lines[position.y][position.x];
  let steps = 0;
  while (nextChar !== " ") {
    steps++;
    position.x += direction.x;
    position.y += direction.y;
    nextChar = lines[position.y][position.x];

    if (/[a-z]/i.test(nextChar)) {
      letters.push(nextChar);
      continue;
    }

    if (nextChar !== "+") {
      continue;
    }

    // We need to change direction
    if (direction.x === 0) {
      // Was going up or down
      let nextLeft =
        position.x - 1 >= 0 ? lines[position.y][position.x - 1] : null;
      if (nextLeft === "-" || /[a-z]/i.test(nextLeft)) {
        direction.x = -1;
        direction.y = 0;
        continue;
      }

      let nextRight =
        position.x + 1 < lines[position.y].length
          ? lines[position.y][position.x + 1]
          : null;
      if (nextRight === "-" || /[a-z]/i.test(nextRight)) {
        direction.x = 1;
        direction.y = 0;
        continue;
      }

      return "SHOULD NOT HAPPEN";
    } else {
      // was going left or right
      let nextUp =
        position.y - 1 >= 0 ? lines[position.y - 1][position.x] : null;
      if (nextUp === "|" || /[a-z]/i.test(nextUp)) {
        direction.x = 0;
        direction.y = -1;
        continue;
      }

      let nextDown =
        position.y + 1 < lines.length
          ? lines[position.y + 1][position.x]
          : null;
      if (nextDown === "|" || /[a-z]/i.test(nextDown)) {
        direction.x = 0;
        direction.y = 1;
        continue;
      }

      return "SHOULD NOT HAPPEN";
    }
  }

  return { steps, letters: letters.join("") };
};

module.exports = { getLetters };
