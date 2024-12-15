const { Natural, Integer } = require("../index");
const { typeCheck } = require("./check");

test("typeCheck basics", () => {
    expect(typeCheck(0, Number)).toBe(true);
    expect(typeCheck(null, Object)).toBe(true);
    expect(typeCheck({ x: 20, y: -50 }, { x: Natural, y: Integer })).toBe(true);

    expect(typeCheck(undefined, Object)).toBe(false);
    expect(typeCheck({ x: -20, y: -50 }, { x: Natural, y: Integer })).toBe(false);
    expect(typeCheck("40", Number)).toBe(false);
    expect(typeCheck(40, String)).toBe(false);
});