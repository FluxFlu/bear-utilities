const { allowModification } = require("../../src/index");

allowModification(String);

const str = "Lion Shark";

// Prints "Lion Shork"
console.log(str.replaceAt(7, "o"));