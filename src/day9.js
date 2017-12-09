const removeEscapes = input => {
  return input.replace(/!./g, "");
};

const removeGarbage = input => {
  return removeEscapes(input).replace(/<.*?>/g, "");
};

const scoreGroups = input => {
  const cleanInput = removeGarbage(input).replace(/,/g, "");

  let opened = 0;
  let count = 0;
  cleanInput.split("").map(char => {
    if (char === "{") {
      opened++;
    } else {
      count += opened;
      opened--;
    }
  });
  return count;
};

const countGarbage = input => {
  const cleanInput = removeEscapes(input);
  const garbageCapture = /<(.*?)>/g;
  let garbage = garbageCapture.exec(cleanInput);
  let count = 0;
  while (garbage != null) {
    count += garbage[1].length;
    garbage = garbageCapture.exec(cleanInput);
  }

  return count;
};
module.exports = {
  removeEscapes,
  removeGarbage,
  scoreGroups,
  countGarbage
};
