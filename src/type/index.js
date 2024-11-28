const { typeCheck } = require("./match/check");
const { typeMatch } = require("./match");
const { defineTypeBehavior } = require("./match/check/custom_behavior");

const { Type } = require("./type"); 
const { Nullable, Any, None, Not, Or, And, Integer, Natural, Range, Refine, Tuple, Lit } = require("./type_data/index");

module.exports = {
    typeCheck, typeMatch, defineTypeBehavior,
    Type,
    Nullable, Any, None, Not, Or, And, Integer, Natural, Range, Refine, Tuple, Lit,
};