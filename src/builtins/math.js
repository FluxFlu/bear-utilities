const { typeMatch } = require("../type");
const { Builtin } = require("./registry");


Builtin.register(Math, () => {
    Math.randomInRange = function(min, max) {
        typeMatch(min, Number);
        typeMatch(max, Number);
        return min + Math.random() * (max - min);
    };
});