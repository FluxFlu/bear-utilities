const { Natural, Integer } = require("../index");
const { validType } = require("./valid_type");

test("validType basics", () => {
    expect(validType(Number)).toBe(true);
    expect(validType(Object)).toBe(true);
    expect(validType({ x: Natural, y: Integer })).toBe(true);
    expect(validType({})).toBe(true);
    expect(validType([Natural])).toBe(true);
    expect(validType([Number])).toBe(true);
    expect(validType([])).toBe(true);

    expect(validType(undefined)).toBe(false);
    expect(validType(null)).toBe(false);
    expect(validType({ x: Natural, y: 20 })).toBe(false);
    expect(validType(new Set())).toBe(false);
    expect(validType([Natural, Natural])).toBe(false);
    expect(validType([Number, Number])).toBe(false);
    expect(validType({ x: -20, y: -50 })).toBe(false);
    expect(validType("40")).toBe(false);
    expect(validType(40)).toBe(false);
});