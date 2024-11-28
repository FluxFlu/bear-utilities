const { allowModification, typeMatch, Union, Natural } = require("../../src/index");
allowModification(Array);

// Create a new union "Animal".
const Animal = new Union("Animal", [
    [ "Dog", [ String, Natural ] ],
    [ "Cat", [ Natural ] ]
]);

const { Dog, Cat } = Animal.getTagInitializers();


const spot = Dog("Spot", 40);

// This is true, because Dog is a tag of the Animal union.
typeMatch(spot, Animal);

// Print `Dog(Spot, 40)`
console.log(spot.toString());


const kitty = Cat(24);

// This is true, because Cat is a tag of the Animal union.
typeMatch(kitty, Animal);

// Print `Cat(24)`
console.log(kitty.toString());

// Print `26`
console.log(kitty.value + 2);