const { internalError } = require("../errors/internal_error");

function nonVariadic(fn) {
    const paramCount = fn.length;
    return (...values) => {
        if (values.length > paramCount) {
            internalError("Passed extraneous parameters to a function.");
        }
        return fn(...values);
    };
}

module.exports = { nonVariadic };