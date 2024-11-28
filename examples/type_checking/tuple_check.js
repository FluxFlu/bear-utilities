const { typeCheck } = require("../../src/type");
const { Natural, Tuple } = require("../../src/type_data");

const arr = [ 20, 40, 60, "Dolphin" ];

// Check if `arr` is an array of values that exactly matches the type [Natural, Natural, String, String].
// This prints `false`, because it isn't. The third value, `60`, is a Natural, not a String.
console.log(typeCheck(arr, Tuple(Natural, Natural, String, String)));

// Check if `arr` is an array of values that exactly matches the type [Natural, Natural, Natural, String].
// This prints `true`, because it is.
console.log(typeCheck(arr, Tuple(Natural, Natural, Natural, String)));