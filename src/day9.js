const removeEscapes = input => {
  return input.replace(/!./g, "");
};

const removeGarbage = input => {
  return removeEscapes(input).replace(/<.*?>/g, "");
};

const scoreGroups = input => {
  let cleanInput = removeGarbage(input).replace(/,/g, "");

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

module.exports = {
  removeEscapes,
  removeGarbage,
  scoreGroups
};
