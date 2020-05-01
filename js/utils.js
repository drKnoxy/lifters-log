//@ts-check

export const cx = (...args) => {
  let out;
  args.forEach((a) => {
    if (typeof a === "string") {
      out += " " + a;
    } else {
      Object.entries(a).forEach(([v, k]) => {
        if (k) out += " " + v;
      });
    }
  });
  return out;
};

/**
 * [calcWeight description]
 *
 * @param  {number}   weight     [description]
 * @param  {number}   percentage [description]
 * @param  {number}   cycle      [description]
 * @param  {number}   increment  [description]
 * @return {number}              [description]
 */
export function calcWeight(weight, percentage, cycle, increment) {
  // Add an extra check for weight, because it is a user input,
  // so it is very possible for it to be falsey
  if (false === !!weight) {
    return "-";
  }

  weight *= 0.9; // start with 90% of the recorded 1rm
  weight += cycle * increment; // add to the weight based on cycle
  weight *= percentage; // modify the weight used based on the program
  weight = round5(weight); // round it to the nearest 5 lbs

  return weight;

  // Round to the nearest 5
  function round5(num) {
    return Math.round(num / 5) * 5;
  }
}

/**
 *
 * @param {number|undefined} input
 * @return {string}
 */
export function round5(input) {
  return isNaN(input) ? "-" : (Math.round(input / 5) * 5).toString();
}

/**
 * Epley Formula for One rep max
 * https://en.wikipedia.org/wiki/One-repetition_maximum
 * @param {{weight: number, reps: number}} r
 */
export function oneRepMax(r) {
  if (false === !!r.weight || false === !!r.reps) {
    return 0;
  }

  return r.weight * (1 + r.reps / 30);
}

export function getPlates(weight) {
  var plates = weightOnBar({ weight });
  return plates.map(({ plate, count }) => `${count} x ${plate}`);
}

/**
 * Returns the weight on each side
 *
 * @param {{weight: number, bar?: number}} args
 * @return [{plate: number, count: number}]
 */
export function weightOnBar({ weight, bar = 45 }) {
  var plates = weight - bar;
  var platesPerSide = plates / 2;
  var out = [];

  [45, 35, 25, 10, 5, 2.5].forEach((p) => {
    var count = Math.floor(platesPerSide / p);
    if (count > 0) {
      out.push({ plate: p, count });
      platesPerSide -= count * p;
    }
  });

  return out;
}
