const { typeCheck } = require("../../src/type");
const { Integer, Natural } = require("../../src/type_data");

const vector = { x: -20, y: 60 };

// Check if `vector` is a struct containing properties x and y, both of which  must be Integers.
// This prints `true`, because it is.
console.log(typeCheck(vector, { x: Integer, y: Integer }));

// Check if `vector` is a struct containing properties x and y, both of which  must be Naturals.
// This prints `false`, because it isn't. The property x has value `-20`, which is not a natural number.
console.log(typeCheck(vector, { x: Natural, y: Natural }));