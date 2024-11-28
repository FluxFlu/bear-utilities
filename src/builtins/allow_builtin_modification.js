const { internalError } = require("../errors/internal_error");
const { typeMatch } = require("../type");
const { Or } = require("../type/type_data");
const { Builtin } = require("./registry");

const modifyableBuiltins = [ Array, Math, String ];

function allowModification(objects) {
    if (objects instanceof Array) {
        const invalidObject = objects.find(e => !modifyableBuiltins.includes(e));
        if (invalidObject) {
            internalError(
                "Invalid object [%O] passed to `allowModification`. A list of valid objects is as follows.", invalidObject,
                modifyableBuiltins.map(e => "\n - " + (e.name || "Math")).join(""));
        }
        objects.forEach(e => Builtin.get(e)());
    } else {
        if (!modifyableBuiltins.includes(objects)) {
            internalError(
                "Invalid object [%O] passed to `allowModification`. A list of valid objects is as follows.", objects,
                modifyableBuiltins.map(e => "\n - " + (e.name || "Math")).join(""));
        }
        typeMatch(objects, Or(...modifyableBuiltins));
        Builtin.get(objects)();
    }
}

function allowAllModification() {
    modifyableBuiltins.forEach(e => Builtin.get(e)());
}

module.exports = { allowModification, allowAllModification };