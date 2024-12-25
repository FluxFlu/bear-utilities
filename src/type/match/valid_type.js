const { Type } = require("../type");
const { getCustomBehavior } = require("./check/custom_behavior");

function validType(type) {
    switch (typeof type) {
        case "object":
            if (type === null) {
                return false;
            } else if (type.constructor !== Object) {
                switch (type.constructor) {
                    case Array:
                        return type.length === 1 || type.length === 0;
                    case Type:
                        return true;
                    default:
                        return getCustomBehavior(type) || false;
                }
            } else {
                return Object.values(type).every(validType);
            }
        case "function":
            return true;
        default:
            return false;
    }
}

module.exports = { validType };