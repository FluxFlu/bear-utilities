const { Just, typeMatch, Natural, Maybe, Nothing } = require("../../src/index");

// "Maybe" is a union type used to enforce handling of the null case.


// This is "Just" the value 20.
const value1 = Just(20);

// This checks as a `Maybe(Natural)` because 20 is a `Natural` and the `Just` function wraps a value in a Maybe.
typeMatch(value1, Maybe(Natural));

// Prints `Just(20)`
console.log(value1.toString());


// There is no value here. This is the "null case".
const value2 = Nothing;

// This checks as a `Maybe(Natural)` because Nothing will always be a valid Maybe.
typeMatch(value2, Maybe(Natural));

// Prints `Nothing`.
console.log(value2.toString());