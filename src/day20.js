const _ = require("lodash");

const getDistances = particules => {
  return _(particules)
    .map((p, index) => {
      return {
        index,
        d: Math.abs(p.px) + Math.abs(p.py) + Math.abs(p.pz)
      };
    })
    .orderBy("d")
    .map("index")
    .value();
};

const updateState = particules => {
  return particules.map(p => {
    return {
      px: p.px + p.vx + p.ax,
      py: p.py + p.vy + p.ay,
      pz: p.pz + p.vz + p.az,
      vx: p.vx + p.ax,
      vy: p.vy + p.ay,
      vz: p.vz + p.az,
      ax: p.ax,
      ay: p.ay,
      az: p.az,
      p: `${p.px + p.vx + p.ax}|${p.py + p.vy + p.ay}|${p.pz + p.vz + p.az}`
    };
  });
};

const parseInitial = input => {
  const parseLine = /p=<([0-9-]+),([0-9-]+),([0-9-]+)>, v=<([0-9-]+),([0-9-]+),([0-9-]+)>, a=<([0-9-]+),([0-9-]+),([0-9-]+)>/;
  return input.split(/\n/).map(line => {
    const matches = line.match(parseLine);
    const [unused, px, py, pz, vx, vy, vz, ax, ay, az] = matches;
    return {
      px: parseInt(px, 10),
      py: parseInt(py, 10),
      pz: parseInt(pz, 10),
      vx: parseInt(vx, 10),
      vy: parseInt(vy, 10),
      vz: parseInt(vz, 10),
      ax: parseInt(ax, 10),
      ay: parseInt(ay, 10),
      az: parseInt(az, 10)
    };
  });
};

const removeDuplicate = particles => {
  const counts = _.countBy(particles, p => p.p);
  return particles.filter(p => counts[p.p] === 1);
};

const getParticlesAfterCollision = input => {
  const threshold = 100;
  let particules = parseInitial(input);

  particules = _.map(particules, p => {
    p.p = `${p.px}|${p.py}|${p.pz}`;
    return p;
  });
  particules = removeDuplicate(particules);

  let iteration = 0;
  let isSameOrder = false;
  let order = getDistances(particules);
  while (!isSameOrder || iteration < threshold) {
    particules = updateState(particules);
    particules = removeDuplicate(particules);

    const nextOrder = getDistances(particules);

    if (_.isEqual(order, nextOrder)) {
      isSameOrder = true;
      iteration++;
    } else {
      isSameOrder = false;
      iteration = 0;
    }
    order = nextOrder;
  }

  return particules.length;
};

const getClosestToZero = input => {
  const threshold = 100;
  let particules = parseInitial(input);

  let iteration = 0;
  let isSameOrder = false;
  let order = getDistances(particules);
  while (!isSameOrder || iteration < threshold) {
    particules = updateState(particules);
    const nextOrder = getDistances(particules);

    if (_.isEqual(order, nextOrder)) {
      isSameOrder = true;
      iteration++;
    } else {
      isSameOrder = false;
      iteration = 0;
    }
    order = nextOrder;
  }

  return order[0];
};

module.exports = { getClosestToZero, getParticlesAfterCollision };
