const { errorTemplate } = require("./utils/error_template");

const internalError = errorTemplate("Internal Error", 99);

module.exports = { internalError };