const { typeCheck } = require("../match/check");
const { Natural, Range } = require("./number_types");
const { Or, And } = require("./logic");

test("Or", () => {
    const type = Or(Natural, String);

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck("Test", type)).toBe(true);

    expect(typeCheck(2.4, type)).toBe(false);
    expect(typeCheck(Infinity, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});

test("And", () => {
    const type = And(Natural, Range(-2, 6));

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck(6, type)).toBe(true);

    
    expect(typeCheck(7, type)).toBe(false);
    expect(typeCheck(2.4, type)).toBe(false);
    expect(typeCheck(Infinity, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});