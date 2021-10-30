'use strict';

// const num = new Number(3);
// const func = new Function(3);

// console.log(num);
// console.log(func);

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function () {
        console.log(`Hello ${this.name}`);
    };
}

User.prototype.exit = function () {
    console.log(`User ${this.name} leave`);
};

const ivan = new User('Ivan', 28);
const petya = new User('Petya', 20);

ivan.exit();

ivan.hello();
petya.hello();

console.log(ivan);
console.log(petya);



class UserClass {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.human = true;
    }

    hello() {
        console.log(`Hello ${this.name}`);
    }

    exit() {
        console.log(`User ${this.name} leave`);
    }
}

UserClass.prototype.walk = function (isWalk) {
    this.walk = isWalk;
};