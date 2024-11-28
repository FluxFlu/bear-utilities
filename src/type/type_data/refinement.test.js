const { typeCheck } = require("../match/check");
const { Natural } = require("./number_types");
const { Refine } = require("./refinement");

test("Refinement", () => {
    const type = Refine(Natural, e => !(e % 5));

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck(100, type)).toBe(true);
    
    expect(typeCheck(4, type)).toBe(false);
    expect(typeCheck(101, type)).toBe(false);

    expect(typeCheck(-1, type)).toBe(false);
    expect(typeCheck(2.4, type)).toBe(false);
    expect(typeCheck(Infinity, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});