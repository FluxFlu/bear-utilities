
const globals = require("globals");
const js = require("@eslint/js");


module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "script",
            globals: {
                ...globals.node,
                ...globals.jest
            }
        },
        "rules": {
            "no-unused-vars": [
                "error",
                {
                    "vars": "all",
                    "args": "all",
                    "argsIgnorePattern": "^_$",
                    "caughtErrors": "all",
                    "caughtErrorsIgnorePattern": "^_$",
                    "destructuredArrayIgnorePattern": "^_$"
                }
            ],
            "curly": [
                "error"
            ],
            "indent": [
                "error",
                4,
                {
                    "SwitchCase": 1
                }
            ],
            "linebreak-style": [
                "error",
                "windows"
            ],
            "quotes": [
                "error",
                "double"
            ],
            "no-constant-condition": [
                "off"
            ],
            "no-case-declarations": [
                "off"
            ],
            "semi": [
                "error",
                "always"
            ],
            "camelcase": [
                "error",
                {
                    "properties": "always"
                }
            ],
            "no-cond-assign": [
                "off"
            ],
            "no-var": ["error"],
            "object-curly-spacing": ["error", "always"],
            "prefer-const": ["error"]
        }
    }];