const { typeCheck } = require("../../src/type");
const { Natural, Integer } = require("../../src/type_data");

const arr1 = [ 20, 40, 60 ];

// Check if `arr1` is an array of natural numbers.
// This prints `true`, because it is.
console.log(typeCheck(arr1, [Natural]));


const arr2 = [ -20, 0, 20, 40, 60 ];

// Check if `arr2` is an array of natural numbers.
// This prints `false`, because it isn't. it contains the value `-20`.
console.log(typeCheck(arr2, [Natural]));

// It is, however, an array of integers. So this prints `true`.
console.log(typeCheck(arr2, [Integer]));