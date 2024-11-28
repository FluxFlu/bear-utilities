const { Natural, Integer } = require("../type_data");
const { reduceTypeList } = require("./type_of/reduce_list");

function typeOf(value) {
    switch (typeof value) {
        case "object":
            if (value.constructor !== Object) {
                switch (value.constructor) {
                    case Array:
                        return reduceTypeList(value.map(e => typeOf(e)));
                    default:
                        return value.constructor;
                }
            } else {
                const obj = {};
                Object.entries(value).forEach(([key, value]) => {
                    obj[key] = typeOf(value);
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