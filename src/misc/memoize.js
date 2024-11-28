const { internalError } = require("../errors/internal_error");
const { typeMatch } = require("../type/match");
const { Nullable, Natural } = require("../type/type_data/index");

function memoize(fn, cap) {
    typeMatch(fn, Function);
    typeMatch(cap, Nullable(Natural));
    if (fn.length !== 1) {
        internalError("Cannot memoize function that doesn't have exactly one parameter. Attempted to memoize function [%O].", fn);
    }
    if (fn.memoCache) {
        internalError("Attempted to memoize function [%O], but it has already been memoized.", fn);
    }
    const memoCache = new Map();

    // We have do do the cap check here instead of within the function,
    // because otherwise we would have to check every time the memoized function gets called.
    // This would create lots of unnecessary overhead.
    let memoFn;
    if (cap === undefined) {
        memoFn = (argument) => {
            const out = memoCache.get(argument);
            if (out !== undefined) {
                return out;
            } else {
                const result = fn(argument);
                memoCache.set(argument, result);
                return result;
            }
        };
    } else {
        memoFn = (argument) => {
            const out = memoCache.get(argument);
            if (out !== undefined) {
                return out;
            } else {
                const result = fn(argument);
                if (memoCache.size > cap) {
                    memoCache.clear();
                }
                memoCache.set(argument, result);
                return result;
            }
        };
    }
    Object.defineProperty(memoFn, "name", { value: fn.name, writable: false });
    memoFn.memoCache = memoCache;
    return memoFn;
}

module.exports = { memoize };