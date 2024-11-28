class Builtin {
    static registered = new Map();
    static register(obj, fn) {
        Builtin.registered.set(obj, fn);
    }
    static get(obj) {
        return Builtin.registered.get(obj);
    }
}

module.exports = { Builtin };