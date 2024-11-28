const { typeCheck } = require("../match/check");
const { formatType } = require("../match/format");
const { Type } = require("../type");

const Refine = (base, check) => new Type(`Refine(${formatType(base)}, ${check.toString()})`, value => typeCheck(value, base) && check(value));

module.exports = { Refine };