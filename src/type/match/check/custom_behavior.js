const { typeError } = require("../../../errors");
const { internalError } = require("../../../errors/internal_error");

const customBehavior = new Map();
const customFormatting = new Map();

function getPrototypeChain(obj) {
    const chain = [];
    if (!obj) {
        internalError("Invalid type object [%O].", obj);
    }
    if (obj.constructor) {
        obj = obj.constructor;
    }
    while (obj.prototype) {
        chain.push(obj);
        obj = Object.getPrototypeOf(obj);
    }
    chain.push(obj);
    return chain;
}

function defineTypeBehavior(type, checkingFunction, formattingFunction) {
    // Cannot call `typeCheck` due to circular dependency issues.
    // Checking manually instead.
    if (typeof checkingFunction !== "function") {
        typeError(checkingFunction, "Function", typeof checkingFunction);
    }
    if (typeof formattingFunction !== "function") {
        typeError(formattingFunction, "Function", typeof formattingFunction);
    }
    customBehavior.set(type, checkingFunction);
    customFormatting.set(type, formattingFunction);
}

function getCustomBehavior(type) {
    return getPrototypeChain(type).map(e => customBehavior.get(e)).find(e => e);
}

function getCustomFormatting(type) {
    return getPrototypeChain(type).map(e => customFormatting.get(e)).find(e => e);
}

module.exports = { defineTypeBehavior, getCustomBehavior, getCustomFormatting };