const { typeMatch, Natural, Integer, Category, Entity } = require("../../src/index");

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

const Ages = new Category("Ages", [
    function increaseAge() {
        typeMatch(this.age, Natural);
        this.age++;
    }
]);

Animal.impl(Ages);

// Spot now ages, because Animal implements the Ages category.

// Spot's age is 14 here.
console.log(spot);

// Increase Spot's age.
spot.increaseAge();

// Spot's age is 15 here.
console.log(spot);


// This bizarre animal ages in reverse!
class BizarreAnimal extends Entity {
    constructor(age) {
        super();
        // We check for Integer rather than Natural, because it can have a negative age.
        typeMatch(age, Integer);
        this.age = age;
    }
}

BizarreAnimal.impl(Ages, [
    // We use an override here when implementing the Ages category.
    // By re-defining increaseAge as part of the implementation of BizarreAnimal,
    // we are able to support the behaviour that the animal requires.
    function increaseAge() {
        typeMatch(this.age, Integer);
        this.age--;
    }
]);

const bizarreAnimal = new BizarreAnimal(2);

// The animal's age is 2 here.
console.log(bizarreAnimal);
bizarreAnimal.increaseAge();
bizarreAnimal.increaseAge();
bizarreAnimal.increaseAge();
bizarreAnimal.increaseAge();

// The animals age is -2 here.
console.log(bizarreAnimal);


// Throws an error. BizzareAnimal does not implement Woofs.
typeMatch(bizarreAnimal, Woofs);