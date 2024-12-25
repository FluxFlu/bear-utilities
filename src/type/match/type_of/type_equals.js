const { Type } = require("../../type");

function typeEquals(type1, type2) {
    if (type1 === type2) {
        return true;
    }

    if (type1 instanceof Type) {
        return type2 instanceof Type && (type1.name === type2.name && type1.check.toString() === type2.check.toString());
    }
    
    if (typeof type1 !== typeof type2) {
        return false;
    }

    switch (typeof type1) {
        case "object":
            if (type2.constructor !== type1.constructor) {
                return false;
            }

            if (type1.constructor === Array) {
                return typeEquals(type1[0], type2[0]);
            }

            const type1Entries = Object.entries(type1);
            if (type1Entries.length !== Object.entries(type2).length) {
                return false;
            }

            return type1Entries.every(([key, value]) => typeEquals(value, type2[key]));
        case "function":
            return type1.toString() === type2.toString();
        default:
            return false;
    }
}

module.exports = { typeEquals };