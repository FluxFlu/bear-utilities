const { internalError } = require("../errors/internal_error");
const { typeMatch } = require("../type");
const { Refine } = require("../type/type_data");
const { Category } = require("./category");

class Entity {
    static handler = {
        get(target, prop, receiver) {
            const catProperty = target.constructor.categoryMethods.get(prop);
            if (catProperty) {
                return catProperty;
            }

            return Reflect.get(target, prop, receiver);
        }
    };
    static impl(cat, functionDefinitions = []) {
        typeMatch(cat, Category);
        typeMatch(functionDefinitions, [Refine(Function, e => e.name)]);

        if (!this.categoryMethods) {
            this.categoryMethods = new Map();
            this.categoryList = [];
        }

        const overlap = [...cat.methods].find(newMethod => this.categoryMethods.has(newMethod.name));
        if (overlap) {
            internalError("Entity [%s] may not extend category [%s] because of overlap with category [%s].", this.name, cat.name, overlap.name);
        }
        const invalidFunctionDef = functionDefinitions.find(fn => !cat.methods.some(e => e.name === fn.name));
        if (invalidFunctionDef) {
            internalError("Override [%s] in entity [%s] impl of category [%s] does not match any method of the given category.", invalidFunctionDef.name, this.name, cat.name);
        }
        cat.methods.forEach(method => {
            const override = functionDefinitions.find(e => e.name === method.name);
            this.categoryMethods.set(method.name, override || method);
        });
        this.categoryList.push(cat);

        cat.wasUsed = true;
    }
    constructor() {
        return new Proxy(this, Entity.handler);
    }
}

module.exports = { Entity };