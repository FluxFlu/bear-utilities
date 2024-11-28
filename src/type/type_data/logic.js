const { typeCheck } = require("../match/check");
const { formatType } = require("../match/format");
const { Type } = require("../type");

const Any = new Type("Any", _ => true);

const None = new Type("None", _ => false);

const Not = type => new Type(`Not${formatType(type)}`, value => !typeCheck(value, type));

const Or = (...typeList) => new Type(`Or(${typeList.map(e => formatType(e)).join(", ")})`, value => typeList.some(type => typeCheck(value, type)));

const And = (...typeList) => new Type(`And(${typeList.map(e => formatType(e)).join(", ")})`, value => typeList.every(type => typeCheck(value, type)));

module.exports = { Any, None, Not, Or, And };