const { typeCheck } = require("../match/check");
const { Lit } = require("./literal");


test("Literal", () => {
    expect(typeCheck(20, Lit(20))).toBe(true);
});