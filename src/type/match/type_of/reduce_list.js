const { Integer, Natural } = require("../../type_data");

function reduceTypeList(typeList) {
    if (typeList.every(e => [Number, Integer, Natural].includes(e))) {
        if (typeList.every(e => e === Natural)) {
            return [Natural];
        } else if (typeList.every(e => e === Integer || e === Natural)) {
            return [Integer];
        } else {
            return [Number];
        }
    }
    return typeList;
}

module.exports = { reduceTypeList };