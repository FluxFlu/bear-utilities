const { Lit } = require("../../src");
const { typeCheck } = require("../../src/type");

const number = 30;

// Number is literally the value 30, however the following code would throw an error, as "30" is not a valid type.

// console.log(typeCheck(number, 30));


// We use the `Lit` type constructor instead, to check if a lefthand value is "Literally" the righthand value.

console.log(typeCheck(number, Lit(number)));

// This may seem useless, however it becomes very useful in conjunction with other type constructors, such as the `Or` constructor.