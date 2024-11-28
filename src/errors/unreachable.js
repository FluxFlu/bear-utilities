function unreachable() {
    console.error("\x1b[1;31mUNREACHABLE\x1b[0m");
    console.trace();
    process.exit(4);
}

module.exports = { unreachable };