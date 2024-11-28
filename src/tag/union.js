const { typeMatch, Tuple, defineTypeBehavior, typeCheck, Lit, Or } = require("../type");
const { Tag, TaggedData } = require("./tag");

class Union {
    constructor(name, tagList, symbol = Symbol()) {
        this.name = typeMatch(name, String);

        typeMatch(tagList, [Or(Tuple(String, Array), Tuple(String))]);
        this.tagList = new Map();
        this.tagFnList = {};
        tagList.forEach(([tagName, typeArray]) => {
            const size = typeArray ? typeArray.length : 0;
            if (size > 1) {
                const tag = new Tag(tagName, Tuple(...typeArray), symbol);
                this.tagList.set(tagName, tag);
                const tagFunction = (...values) => {
                    typeMatch(values, tag.requiredType);
                    return tag.instance(values);
                };
                this.tagFnList[tagName] = tagFunction;
            } else if (size === 1) {
                const type = typeArray[0];
                const tag = new Tag(tagName, type, symbol);
                this.tagList.set(tagName, tag);
                const tagFunction = value => {
                    typeMatch(value, tag.requiredType);
                    return tag.instance(value);
                };
                this.tagFnList[tagName] = tagFunction;
            } else {
                const tag = new Tag(tagName, Lit(undefined), symbol);
                this.tagList.set(tagName, tag);
                const tagFunction = () => tag.instance().setName(tagName);
                this.tagFnList[tagName] = tagFunction;
            }
        });
        
        this.symbol = typeMatch(symbol, Symbol);
    }
    getTag(tagName) {
        return this.tagList[tagName];
    }
    getTags() {
        return this.tagList;
    }
    getTagInitializer(tagName) {
        return this.tagFnList[tagName];
    }
    getTagInitializers() {
        return this.tagFnList;
    }
    toString() {
        return this.name;
    }
}

defineTypeBehavior(Union,
    (value, type) => {
        return value instanceof TaggedData && value.tag.symbol === type.symbol && type.tagList.get(value.tag.name) && typeCheck(value.value, type.tagList.get(value.tag.name).requiredType);
    },
    type => {
        return type.name;
    }
);

module.exports = { Union };