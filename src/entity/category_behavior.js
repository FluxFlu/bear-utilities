const { defineTypeBehavior } = require("../type/match/check/custom_behavior");
const { Category } = require("./category");
const { Entity } = require("./entity");


defineTypeBehavior(Category,
    (value, type) => {
        return value instanceof Entity && value.constructor.categoryList && value.constructor.categoryList.includes(type);
    },
    type => {
        return type.name;
    }
);