const arr = [1, 2, 3];

// This throws an error.
// `Array.random` is not a function, because we didn't explicitly allow modification of the Array prototype.
console.log(arr.random());