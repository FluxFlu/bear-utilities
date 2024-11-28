const { typeCheck } = require("../match/check");
const { Nullable } = require("./nullable");
const { Natural } = require("./number_types");

test("Nullable valid", () => {
    const type = Nullable(Natural);
    expect(typeCheck(20,        type)).toBe(true);
    expect(typeCheck(undefined, type)).toBe(true);
    expect(typeCheck(null,      type)).toBe(true);
});

test("Nullable invalid", () => {
    const type = Nullable(Natural);
    expect(typeCheck(2.5, type)).toBe(false);
    expect(typeCheck(-1,  type)).toBe(false);
    expect(typeCheck({},  type)).toBe(false);
});