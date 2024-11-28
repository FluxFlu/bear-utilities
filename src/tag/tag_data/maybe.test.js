const { Natural } = require("../../type");
const { typeCheck } = require("../../type/match/check");
const { Maybe, Just, Nothing } = require("./maybe");

test("Maybe", () => {
    const type = Maybe(Natural);

    expect(typeCheck(Just(0), type)).toBe(true);
    expect(typeCheck(Just(20), type)).toBe(true);
    expect(typeCheck(Nothing, type)).toBe(true);

    expect(typeCheck(-40, type)).toBe(false);
    expect(typeCheck(40, type)).toBe(false);
    expect(typeCheck(null, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});