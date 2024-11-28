const { typeCheck } = require("../match/check");
const { Natural } = require("./number_types");
const { Tuple } = require("./tuple");

test("Refinement", () => {
    const type = Tuple(Natural, Number, String);

    expect(typeCheck([1, 2.5, "Test"], type)).toBe(true);
    
    expect(typeCheck(["Test", 2.5, 1], type)).toBe(false);
    expect(typeCheck([], type)).toBe(false);

    expect(typeCheck(0, type)).toBe(false);
    expect(typeCheck(2.4, type)).toBe(false);
    expect(typeCheck("Test", type)).toBe(false);
    
    expect(typeCheck(undefined, type)).toBe(false);
});