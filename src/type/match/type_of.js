const { Natural, Integer, Lit } = require("../type_data");
const { typeCheck } = require("./check");
const { reduceTypeList } = require("./type_of/reduce_list");
const { validType } = require("./valid_type");

function typeOf(value, expectedType) {
    const expectedTypeExists = validType(expectedType);
    if (expectedTypeExists && typeCheck(value, expectedType)) {
        return expectedType;
    }
    switch (typeof value) {
        case "object":
            if (!value) {
                if (expectedTypeExists && typeCheck({}, expectedType)) {
                    return Lit(null);
                }
                return Object;
            }
            if (value.constructor !== Object) {
                switch (value.constructor) {
                    case Array:
                        if (expectedTypeExists && expectedType instanceof Array) {
                            if (value.every(e => typeCheck(e, expectedType[0]))) {
                                return expectedType;
                            } else {
                                return reduceTypeList(value.map(e => ({ value: e, type: typeOf(e, expectedType[0]) })));
                            }
                        } else {
                            return reduceTypeList(value.map(e => ({ value: e, type: typeOf(e, null) })));
                        }
                    default:
                        return value.constructor;
                }
            } else {
                const obj = {};
                Object.entries(value).forEach(([key, value]) => {
                    obj[key] = typeOf(value, expectedTypeExists && expectedType[key]);
                });
                return obj;
            }
        case "number":
            if (Number.isInteger(value)) {
                if (value >= 0) {
                    return Natural;
                } else {
                    return Integer;
                }
            } else {
                return Number;
            }
        default:
            const typename = typeof value;
            return typename[0].toUpperCase() + typename.slice(1);
    }
}

module.exports = { typeOf };