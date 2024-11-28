const { Builtin } = require("./registry");


Builtin.register(Array, () => {
    Array.prototype.random = function() {
        // For positive numbers, `~~` is the same as `Math.floor`.
        return this[~~(Math.random() * this.length)];
    };
    Array.prototype.sum = function() {
        return this.reduce((a, b) => a + b);
    };
    Array.prototype.average = function() {
        return this.sum() / this.length;
    };
});