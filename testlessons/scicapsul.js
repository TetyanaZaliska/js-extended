'use strict';

// function User(name, age) {
//     this.name = name;
//     // this.age = age;
//     let userAge = age;

//     this.say = function() {
//         // console.log(`User name: ${this.name}, user age: ${this.age}`);
//         console.log(`User name: ${this.name}, user age: ${userAge}`);
//     };

//     this.getAge = function() {
//         return userAge;
//     };

//     this.setAge = function(age) {
//         if (typeof age === 'number' && age > 0 && age < 150) {
//             userAge = age;
//         } else {
//             console.log('Invalid age value');
//         }
//     };
// }

// const ivan = new User('Ivan', 25);

// console.log(ivan.name);
// console.log(ivan.age);
// ivan.say();

// ivan.age = 30;
// ivan.name = 'Alex';

// ivan.say();

// console.log(ivan.getAge());
// ivan.setAge(30);
// ivan.setAge(300);
// console.log(ivan.getAge());


class User {
    constructor(name, age) {
        this.name = name;
        // this.age = age;
        this._age = age;
    }
    
    // this.age = age;
    #surname = 'Somesurname';
    

    say() {
        // console.log(`User name: ${this.name}, user age: ${this.age}`);
        console.log(`User name: ${this.name} ${this.#surname}, user age: ${this._age}`);
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 150) {
            this._age = age;
        } else {
            console.log('Invalid age value');
        }
    }
}

const alex = new User('Alex', 24);

alex.age = 80;
alex.age = 500;
console.log(alex.age);
alex.say();
console.log(alex.#surname);
console.log(alex.surname);