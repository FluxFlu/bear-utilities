const { errorTemplate } = require("./utils/error_template");
const { internalError } = require("./internal_error");

const typeErrorBase = errorTemplate("Type Error", 2);

function typeError(value, expectedType, actualType, catchExtraValues) {
    if (catchExtraValues !== undefined) {
        internalError("Invalid typeError [%O] needs exactly 3 arguments.", [value, expectedType, actualType, catchExtraValues]);
    }
    
    if (typeof expectedType !== "string") {
        internalError("Invalid typeError argument [%s] needs to be of type [string].", expectedType);
    }
    if (typeof actualType !== "string") {
        internalError("Invalid typeError argument [%s] needs to be of type [string].", actualType);
    }

    typeErrorBase("Mismatched types: Value `%O` expected to be of type `%s`. Instead it was of type `%s`.", value, expectedType, actualType);
}

module.exports = { typeError };