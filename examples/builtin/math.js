const { allowModification } = require("../../src/index");

allowModification([Math]);

// Print a random number in the range [-2, 5).
console.log(Math.randomInRange(-2, 5));