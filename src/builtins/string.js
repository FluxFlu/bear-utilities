const { typeMatch } = require("../type");
const { Range, Nullable } = require("../type/type_data");
const { Builtin } = require("./registry");


Builtin.register(String, () => {
    String.prototype.replaceAt = function(index, replacement, size) {
        typeMatch(index, Range(0, this.length - 1));
        typeMatch(replacement, String);
        typeMatch(size, Nullable(Range(0, this.length - index)));
        if (size === undefined || size === null) {
            return this.slice(0, index) + replacement + this.slice(index + replacement.length);
        } else {
            return this.slice(0, index) + replacement + this.slice(index + size);
        }
    };
});