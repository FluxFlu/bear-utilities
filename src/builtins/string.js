const { typeMatch } = require("../type");
const { Range } = require("../type/type_data");
const { Builtin } = require("./registry");


Builtin.register(String, () => {
    String.prototype.replaceAt = function(index, replacement) {
        typeMatch(index, Range(0, this.length - 1));
        typeMatch(replacement, String);
        return this.slice(0, index) + replacement + this.slice(index + replacement.length);
    };
});