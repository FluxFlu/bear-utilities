const { typeCheck } = require("../../src/type");
const { Integer, Range, And } = require("../../src/type_data");

const arr1 = [ 20, 40.5, 60 ];

// Check if `arr1` is an array of numbers between 20 and 60 (inclusive).
// This prints `true`, because it is.
console.log(typeCheck(arr1, [Range(20, 60)]));

// Check if `arr1` is an array of integers between 20 and 60 (inclusive).
// This prints `false`, because it isn't. `40.5` is a floating-point number.
console.log(typeCheck(arr1, [And(Integer, Range(20, 60))]));


const arr2 = [ -20, 0, 20, 40, 60 ];

// Check if `arr2` is an array of numbers between 20 and 60 (inclusive).
// This prints `false`, because it isn't. `-20` and `0` fall outside of the given range.
console.log(typeCheck(arr2, [Range(20, 60)]));