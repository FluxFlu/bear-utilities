const { memoize } = require("../../src/index");


const slowFib = n => {
    if (n <= 1n) {
        return 1n;
    } else {
        return slowFib(n - 1n) + slowFib(n - 2n);
    }
};

// On most machines, this takes a second to compute.
console.log(slowFib(35n));

const fastFib = memoize(n => {
    if (n <= 1n) {
        return 1n;
    } else {
        return fastFib(n - 1n) + fastFib(n - 2n);
    }
});

// This computes instantly.
console.log(fastFib(5000n));