const { allowAllModification } = require("./index");


test("String Builtins", () => {
    allowAllModification();
    expect("Lion Shark".replaceAt(7, "o")).toBe("Lion Shork");
    expect("Lion Shark".replaceAt(7, "o", 3)).toBe("Lion Sho");
    expect("Lion Shark".replaceAt(6, "o", 3)).toBe("Lion Sok");
});