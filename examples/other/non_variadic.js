const { nonVariadic, typeMatch } = require("../../src");

const sum = nonVariadic((a, b) => typeMatch(a, Number) + typeMatch(b, Number));

// The following line of code is valid.
console.log(sum(20, 40));

// The following line of code will throw an error for including an extraneous parameter.
console.log(sum(20, 40, 50));

// The following line of code will throw an error for not providing a valid "b" value.
console.log(sum(20));