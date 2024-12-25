const { typeError } = require("../errors/type_error");
const { typeCheck } = require("./match/check");
const { formatType } = require("./match/format");
const { typeOf } = require("./match/type_of");

function typeMatch(value, type) {
    const isSame = typeCheck(value, type);

    if (!isSame) {
        typeError(value, formatType(type), formatType(typeOf(value, type)));
    }

    return value;
}

module.exports = { typeMatch };