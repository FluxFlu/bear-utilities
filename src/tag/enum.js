const { Tag } = require("./tag");
const { typeMatch, Or, Lit } = require("../type");
const { internalError } = require("../errors/internal_error");

class Enum extends Tag {
    constructor(name, tagNames, symbol = Symbol()) {
        super(name,
            // Make sure tagNames is an array of strings,
            // and then use it to create a type preventing Enums from being instanced improperly.
            Or(
                ...typeMatch(tagNames, [String])
                    .map(e => Lit(e))
            ),
            symbol
        );
        const keys = Object.keys(this);
        this.tags = [];
        tagNames.forEach(tagName => {
            if (keys.includes(tagName)) {
                internalError("Cannot create enum with value [%s] when it already has a property of that name. This would cause clashes in property access.");
            }
            const tag = this.instance(tagName);
            this[tagName] = tag;
            this.tags.push(tag);
        });
    }
}

module.exports = { Enum };