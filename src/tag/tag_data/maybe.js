const { None } = require("../../type");
const { typeOf } = require("../../type/match/type_of");
const { Union } = require("../union");

const MaybeSymbol = Symbol("Maybe");

const Maybe = a => new Union("Maybe", [
    [ "Just", [ a ] ],
    [ "Nothing" ],
], MaybeSymbol);

const Just = a => Maybe(typeOf(a)).getTagInitializer("Just")(a);

const Nothing = Maybe(None).getTagInitializer("Nothing")();

module.exports = { Maybe, Just, Nothing };