const _ = require("lodash");
const buildFirewall = input => {
  return input
    .split(/\n/)
    .map(line => line.split(": ").map(v => parseInt(v)))
    .reduce((accu, [left, right]) => {
      accu[left] = right;
      return accu;
    }, new Array());
};

const getSeverity = (input, delay = 0) => {
  const firewall = buildFirewall(input);
  return getSeverityWithDelay(firewall, delay);
};

const getSeverityWithDelay = (firewall, delay, throwOnHit = false) => {
  return firewall.reduce((accu, range, depth) => {
    // Range null is skipped, 1 does not exist
    if ((depth + delay) % (range * 2 - 2) === 0) {
      if (throwOnHit) return 1000;
      return accu + depth * range;
    }
    return accu;
  }, 0);
};

const getDelay = input => {
  const firewall = buildFirewall(input);
  let delay = 0;

  while (getSeverityWithDelay(firewall, delay, true) !== 0) delay++;
  return delay;
};
module.exports = { getSeverity, getDelay };
