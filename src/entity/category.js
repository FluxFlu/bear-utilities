const { internalError } = require("../errors/internal_error");
const { typeMatch } = require("../type");
const { Refine } = require("../type/type_data");

class Category {
    constructor(name, methods) {
        this.name = typeMatch(name, String);
        typeMatch(methods, [Refine(Function, e => e.name)]);
        this.methods = methods;

        this.parentList = [];
        this.wasUsed = false;
        this.hasExtended = false;
    }
    call(target, methodName, ...args) {
        typeMatch(target, Object);
        typeMatch(methodName, String);
        typeMatch(args, Array);
        this.methods.find(e => e.name === methodName).apply(target, args);
    }
    extends(cat) {
        typeMatch(cat, Category);
        if (this.wasUsed) {
            internalError("Attempted to use `.extends` with category [%s] that has already been used.", this.name);
        }
        if (this.hasExtended) {
            internalError("Attempted to use `.extends` with category that already extends something else. Category [%s] already extends category [%s].", this.name, this.parentList[0].name);
        }

        const missingImpl = cat.methods.filter(a => !this.methods.some(b => a.name === b.name));
        if (missingImpl.length) {
            const plural = missingImpl.length > 1;
            internalError("Attempted to have category [%s] extend category [%s] despite missing required method%s [%s].", this.name, cat.name, plural ? "s" : "", missingImpl.map(e => e.name).join(", "));
        }
        
        this.hasExtended = true;
        return this;
    }
}

module.exports = { Category };