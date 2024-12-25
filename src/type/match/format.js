const { typeEquals } = require("./type_of/type_equals");
const { Type } = require("../type");
const { getCustomFormatting } = require("./check/custom_behavior");

function formatType(type) {
    const customFormatting = getCustomFormatting(type);
    if (customFormatting) {
        return customFormatting(type);
    }
    if (type instanceof Type) {
        return type.name;
    }
    switch (typeof type) {
        case "object":
            if (type.constructor !== Object) {
                switch (type.constructor) {
                    case Array:
                        if (type.length === 0) {
                            return "[]";
                        }
                        const formatMap = type.map(e => formatType(e));
                        if (type.every(e => typeEquals(e, type[0]))) {
                            return `[${formatMap[0]}]`;
                        } else if (formatMap < 10 && formatMap.join("").length < 150) {
                            return `Tuple(${formatMap.join(", ")})`;
                        } else {
                            return "Array";
                        }
                    default:
                        return type.constructor.name || "Object";
                }
            }
            const typeEntries = Object.entries(type);
            if (typeEntries.length <= 3) {
                return `{ ${typeEntries.map(([key, value]) => key + ": " + formatType(value)).join(", ")} }`;
            } else {
                return `{\n\t${typeEntries.map(([key, value]) => key + ": " + formatType(value)).join(",\n").replaceAll("\n", "\n\t")}\n}`;
            }
        case "function":
            return type.name;
        case "symbol":
            return type.toString();
        default:
            return (type || "undefined").toString();
    }
}

module.exports = { formatType };