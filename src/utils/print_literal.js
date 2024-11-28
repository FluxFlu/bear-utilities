function printLiteral(literal) {
    if (typeof literal === "string") {
        return `"${literal}"`;
    } else if (literal instanceof Array) {
        return literal.map(e => printLiteral(e)).join(", ");
    } else if (literal === undefined) {
        return "undefined";
    } else if (literal === null) {
        return "null";
    }
    return literal.toString();
}

module.exports = { printLiteral };