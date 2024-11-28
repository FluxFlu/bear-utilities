const { typeError } = require("../errors");

class Type {
    constructor(name, check) {
        // Cannot call `typeCheck` due to circular dependency issues.
        // Checking manually instead.
        if (typeof check !== "function") {
            typeError(check, "Function", typeof check);
        }
        this.name = name;
        this.check = check;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    toString() {
        return this.name;
    }
}

module.exports = { Type };