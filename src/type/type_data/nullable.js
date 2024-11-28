const { formatType } = require("../match/format");
const { Lit } = require("./literal");
const { Or } = require("./logic");

const Nullable = type => Or(type, Lit(undefined), Lit(null)).setName(`Nullable(${formatType(type)})`);

module.exports = { Nullable };