const { formatType } = require("../match/format");
const { typeCheck } = require("../match/check");
const { Type } = require("../type");

const Tuple = (...typeList) => new Type(`Tuple(${typeList.map(e => formatType(e)).join(", ")})`, (value) =>
    typeCheck(value, Array) &&
    typeList.length === value.length &&
    typeList.every((type, i) => typeCheck(value[i], type))
);

module.exports = { Tuple };