const { internalError } = require("../../errors/internal_error");
const { Type } = require("../type");
const { getCustomBehavior } = require("./check/custom_behavior");

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
        internalError("Arrays used in typeMatch may not be longer than one value. Passed [%O].", expectedType);
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

    const customBehavior = getCustomBehavior(expectedType);
    if (customBehavior) {
        return customBehavior(value, expectedType);
    }

    if (expectedType instanceof Type) {
        return expectedType.check(value);
    }
    switch (typeof expectedType) {
        case "object":
            if (expectedType === null && value === null) {
                return true;
            }
            if (expectedType.constructor !== Object) {
                switch (expectedType.constructor) {
                    case Array:
                        return arrayMatch(value, expectedType);
                    default:
                        // If the expected object has a non-array constructor, we throw an error.
                        // This is likely unintended behavior if it occurs - Nullable there's some reason for it?
                        internalError("Not allowed to use instantiated object as expectedType parameter for typeCheck. Passed [%O].", expectedType);
                        return;
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
            internalError("Invalid right-hand of typeChecking. Passed value [%O] which does not work as a type.", expectedType);
    }
}

module.exports = { typeCheck };