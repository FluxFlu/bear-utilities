const { Integer, Natural, Nullable } = require("../../type_data");
const { typeEquals } = require("./type_equals");

function reduceTypeList(typeList) {
    if (typeList.length === 0) {
        return [];
    }
    
    if (typeList.every(e => [Number, Integer, Natural].includes(e.type))) {
        if (typeList.every(e => e.type === Natural)) {
            return [Natural];
        } else if (typeList.every(e => e.type === Integer || e.type === Natural)) {
            return [Integer];
        } else {
            return [Number];
        }
    }
    
    const firstReal = typeList.find(e => e.value !== undefined && e.value !== null)?.type;
    if (firstReal && typeList.every(e => e.value === undefined || e.value === null || typeEquals(firstReal.type, e.type))) {
        return [Nullable(firstReal)];
    }

    return typeList.map(e => e.type);
}

module.exports = { reduceTypeList };