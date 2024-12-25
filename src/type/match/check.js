const { internalError } = require("../../errors/internal_error");
const { Type } = require("../type");
const { getCustomBehavior } = require("./check/custom_behavior");
const { validType } = require("./valid_type");

function objMatch(value, expectedType) {
    if (!(value instanceof Object)) {
        return false;
    }

    const expectedKeys = Object.keys(expectedType);
    if (Object.keys(value).length !== expectedKeys.length) {
        return false;
    }
    return expectedKeys.every(key => typeCheck(value[key], expectedType[key]));
}

function arrayMatch(value, expectedType) {
    if (!(value instanceof Array)) {
        return false;
    }
    
    if (expectedType.length > 1) {
        // Not possible due to `validType` check.
    } else if (expectedType.length === 0) {
        return value.length === 0;
    } else {
        return value.every(e => typeCheck(e, expectedType[0]));
    }
}

const primitiveTypes = new Map([
    [ BigInt, "bigint" ],
    [ Boolean, "boolean" ],
    [ Function, "function" ],
    [ Number, "number" ],
    [ Object, "object" ],
    [ String, "string" ],
    [ Symbol, "symbol" ],
]);

function typeCheck(value, expectedType) {

    // We need to account for the existence of primitives.
    // This code comes first in the function, because it's the most common case.
    if (primitiveTypes.has(expectedType)) {
        const strType = primitiveTypes.get(expectedType);
        return value instanceof expectedType || typeof value === strType;
    }

    if (!expectedType || !validType(expectedType)) {
        internalError("Invalid type [%s] passed to `typeCheck`.", expectedType);
    }

    // This code could go inside `case "object":`, but we put it earlier because it's more relevant and needs to be faster.
    if (expectedType instanceof Type) {
        return expectedType.check(value);
    }

    const customBehavior = getCustomBehavior(expectedType);
    if (customBehavior) {
        return customBehavior(value, expectedType);
    }
    switch (typeof expectedType) {
        case "object":
            if (expectedType.constructor !== Object) {
                switch (expectedType.constructor) {
                    case Array:
                        return arrayMatch(value, expectedType);
                    default:
                        return;
                        // Not possible due to `validType` check.
                }
            } else {
                return objMatch(value, expectedType);
            }
        case "function":
            // We can safely assume this "function" is a class, as primitives have already been accounted for.

            let out;
            try {
                out = value instanceof expectedType;
            } catch (_) {
                out = false;
            }
            
            return out;
        default:
            return;
            // Not possible due to `validType` check.
    }
}

module.exports = { typeCheck };