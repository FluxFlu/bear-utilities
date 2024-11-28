const { typeCheck } = require("../match/check");
const { Natural, Integer, Range } = require("./number_types");

test("Natural", () => {
    const type = Natural;

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck(100, type)).toBe(true);

    expect(typeCheck(-1, type)).toBe(false);
    expect(typeCheck(2.4, type)).toBe(false);
    expect(typeCheck(Infinity, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});

test("Integer", () => {
    const type = Integer;

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck(100, type)).toBe(true);
    expect(typeCheck(-1, type)).toBe(true);

    expect(typeCheck(2.4, type)).toBe(false);
    expect(typeCheck(Infinity, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});


test("Range", () => {
    const type = Range(-2, 99);

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck(-1, type)).toBe(true);
    expect(typeCheck(2.4, type)).toBe(true);

    expect(typeCheck(99, type)).toBe(true);

    expect(typeCheck(100, type)).toBe(false);
    expect(typeCheck(Infinity, type)).toBe(false);
    expect(typeCheck(undefined, type)).toBe(false);
});


test("Number", () => {
    const type = Number;

    expect(typeCheck(0, type)).toBe(true);
    expect(typeCheck(-1, type)).toBe(true);
    expect(typeCheck(2.4, type)).toBe(true);
    expect(typeCheck(100, type)).toBe(true);
    expect(typeCheck(Infinity, type)).toBe(true);

    expect(typeCheck(undefined, type)).toBe(false);
});