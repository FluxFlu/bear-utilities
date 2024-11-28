const { defineTypeBehavior, typeCheck, typeMatch } = require("../type");
const { printLiteral } = require("../utils/print_literal");

class Tag {
    constructor(name, requiredType, symbol = Symbol()) {
        this.name = name;
        this.requiredType = requiredType;
        this.symbol = symbol;
    }
    instance(value) {
        return new TaggedData(this, value);
    }
    toString() {
        return this.name;
    }
}

class TaggedData {
    constructor(tag, value) {
        typeMatch(tag, Tag);
        this.tag = tag;
        this.value = value;
    }
    toString() {
        if (this.name) {
            return this.name;
        }
        return `${this.tag}(${printLiteral(this.value)})`;
    }
    setName(name) {
        typeMatch(name, String);
        this.name = name;

        return this;
    }
}

defineTypeBehavior(Tag,
    (value, type) => {
        return value instanceof TaggedData && value.tag.symbol === type.symbol && typeCheck(value.value, type.requiredType);
    },
    type => {
        return type.name;
    }
);

module.exports = { Tag, TaggedData };