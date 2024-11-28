const { printLiteral } = require("../../utils/print_literal");
const { Type } = require("../type");

const Lit = matchValue => new Type(`Lit(${printLiteral(matchValue)})`, value => value === matchValue);

module.exports = { Lit };