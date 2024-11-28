const { Refine } = require("./refinement");

const Integer = Refine(Number, e => Number.isInteger(e)).setName("Integer");
const Natural = Refine(Integer, e => e >= 0).setName("Natural");

const Range = (from, to) => Refine(Number, e => e >= from && e <= to).setName(`Range(${from}, ${to})`);

module.exports = { Integer, Natural, Range };