const errorTemplate = (prefix, errno) => (error, ...args) => {
    if (error.at(-1) != ".") {
        console.error("Error: Errors must end with a '.' character. Offending error [%s].\n", error);
        console.trace();
        process.exit(99);
    }
    console.error(`\x1b[1;31m${prefix}: \x1b[0m` + error, ...args);
    console.trace();
    process.exit(errno);
};

module.exports = { errorTemplate };