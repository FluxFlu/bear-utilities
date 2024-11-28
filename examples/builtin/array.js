const { allowAllModification } = require("../../src/index");

allowAllModification();

const arr1 = [1, 2, 3];

// Print a random number from among 1, 2, or 3.
console.log(arr1.random());

// Print the sum of the three numbers (I.E. `6`)
console.log(arr1.sum());

// Print the average of the three numbers (I.E. `2`).
console.log(arr1.average());


const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const randomValues = [];
for (let i = 0; i < 1000000; i++) {
    randomValues.push(arr2.random());
}

// These numbers should be about equal:
console.log(randomValues.average(), arr2.average());