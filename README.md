<h1 align="center">
    Bear Utilities

</h1>

<h3 align="center">
    A library containing an assortment of features that facilitate and enhance the JavaScript language.
</h3>


<div align="center">

![Static Badge](https://img.shields.io/badge/Version-0.0.0-green)
![Static Badge](https://img.shields.io/badge/License-GPL--3.0-blue)

<!-- ![Picture of a cute bear](./bear.png) -->
<img src="bear.png" style="height: 11em"></img>
</div>


<br><br>



# Type-Checking

Bear Utilities adds runtime type-checking in a clean and composable way.

```js
const sum = (a, b) => typeMatch(a, Number) + typeMatch(b, Number);

// Prints 3.
console.log(sum(1, 2));

// Prints an error and exits.
console.log(sum("1", 2));
```

Types can be as simple or as complex as the user needs them to be.
```js
const createStringKeyMap = arr => {
    // `arr` must be an array of arrays, each of which are length 2 and have an initial value of type String.
    typeMatch(arr, [Tuple(String, Any)]);
    return new Map(arr);
};

// Prints a new map.
console.log(createStringKeyMap([
    ["First", 1],
    ["Second", 2]
]));

// Prints an error and exits. `2` is not of type String.
console.log(createStringKeyMap([
    ["First", 2],
    [2, 2],
]));
```


# Conveniences

Bear Utilities offers many convenient features to help write simpler code.

These include `Array.random()`, `Array.sum()`, and `String.replaceAt()`.

Functions that modify builtin prototypes can often cause issues between libraries, so to prevent this, it is required to run `allowModification()` before any of those functions are added.

```js
allowModification(Array);

const arr1 = [1, 2, 3];

// Print a random number from among 1, 2, or 3.
console.log(arr1.random());

// Print the sum of the three numbers (I.E. `6`)
console.log(arr1.sum());

// Print the average of the three numbers (I.E. `2`).
console.log(arr1.average());
```

# Function Modification

Some functions useful for adding properties to other functions are included, such as `nonVariadic` and `memoize`.

```js
const sum = nonVariadic((a, b) => typeMatch(a, Number) + typeMatch(b, Number));

// The following line of code is valid.
console.log(sum(20, 40));

// The following line of code will throw an error for including an extraneous parameter.
console.log(sum(20, 40, 50));
```

# Data Types

Bear Utilities offers new data types, such as Tag, Enum, Union, and Entity.

These choices allow programmers to represent data in a manner more suited to any particular scenario.



For example, Entities allow users to implement features in a more composable manner than the standard oop style, while still maintaining the ability to use features such as class-inheritance like normal. Users of FP languages will recognize them as very similar to typeclasses.

```js
class Animal extends Entity {
    constructor(name, age) {
        super();
        this.name = typeMatch(name, String);
        this.age = typeMatch(age, Natural);
    }
}

const Woofs = new Category("Woofs", [
    function woof() {
        console.log("Woof!");
    }
]);

Animal.impl(Woofs);

const spot = new Animal("Spot", 14);

// Print "Spot"
console.log(spot.name);

// Print "Woof!"
spot.woof();
```

Maybe is a built-in Union useful for handling the null case.
```js
// This is "Just" the value 20.
const value1 = Just(20);

// This checks as a `Maybe(Natural)` because 20 is a `Natural` and the `Just` function wraps a value in a Maybe.
typeMatch(value1, Maybe(Natural));

// Prints `Just(20)`
console.log(value1.toString());
```