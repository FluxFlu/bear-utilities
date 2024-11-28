const { errorTemplate } = require("../../src/index");

// This code prints "Sample Error: Error text goes here."
// Prints a stack trace, and then exits with an exit code of 2.

const sampleError = errorTemplate("Sample Error", 2);

sampleError("Error text goes here.");