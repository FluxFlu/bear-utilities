const { typeCheck } = require("../../src/type");
const { Natural, Or } = require("../../src/type_data");

const arr = [ 20, 40, 60, "Dolphin" ];

// Check if `arr` is an array of natural numbers.
// This prints `false`, because it isn't. "Dolphin" is a string, not a natural number.
console.log(typeCheck(arr, [Natural]));

// Check if `arr` is an array of values that are either natural numbers or strings.
// This prints `true`, because it is.
console.log(typeCheck(arr, [Or(Natural, String)]));