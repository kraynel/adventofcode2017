const _ = require("lodash");

const countSteps = input => {
  const count = _.countBy(input.split(","));

  return Object.assign(
    {
      n: 0,
      s: 0,
      ne: 0,
      nw: 0,
      se: 0,
      sw: 0
    },
    count
  );
};

const reduceSteps = steps => {
  return {
    n: Math.max(steps.n - steps.s, 0),
    s: Math.max(steps.s - steps.n, 0),
    ne: Math.max(steps.ne - steps.sw, 0),
    nw: Math.max(steps.nw - steps.se, 0),
    se: Math.max(steps.se - steps.nw, 0),
    sw: Math.max(steps.sw - steps.ne, 0)
  };
};

const countDistance = rawSteps => {
  /*
    ne + s = se
    se + n = ne
    nw + s = sw
    sw + n = nw

    se + sw = s
    ne + nw = n
  
  n nw ne -> n + Math.max(nw, ne)
  n nw sw -> nw + Math.max(n, sw)
  n se ne -> se + Math.max(n, se)
  n se sw -> Math.abs(n-Math.min(se, sw)) + Math.abs(se-sw)
  s nw ne -> Math.abs(s-Math.min(ne, nw)) + Math.abs(ne-nw)
  s nw sw -> sw + Math.max(s, nw)
  s se ne -> ne + Math.max(s, ne)
  s se sw -> s + Math.max(se, sw)
  */
  const steps = reduceSteps(rawSteps);
  const existingSteps = _.pickBy(steps);

  switch (_(existingSteps)
    .keys()
    .sort()
    .join(" ")) {
    case "n ne nw":
      return steps.n + Math.max(steps.nw, steps.ne);
    case "n nw sw":
      return steps.nw + Math.max(steps.n, steps.sw);
    case "n ne se":
      return steps.se + Math.max(steps.n, steps.se);
    case "n se sw":
      return (
        Math.abs(steps.n - Math.min(steps.se, steps.sw)) +
        Math.abs(steps.se - steps.sw)
      );
    case "ne nw s":
      return (
        Math.abs(steps.s - Math.min(steps.ne, steps.nw)) +
        Math.abs(steps.ne - steps.nw)
      );
    case "nw s sw":
      return steps.sw + Math.max(steps.s, steps.nw);
    case "ne s se":
      return steps.ne + Math.max(steps.s, steps.ne);
    case "s se sw":
      return steps.s + Math.max(steps.se, steps.sw);
  }
};

module.exports = {
  countSteps,
  reduceSteps,
  countDistance
};
