'use strict';

const number = 2;

(function() {
    const number = 5;

    console.log(number);
    console.log(number + 3);
})();

console.log(number);

const Module = (function() {
    const privat = function() {
        console.log('I am private');
    };

    return {
        sayHello: privat
    };
}());

// Module.privat(); // error
Module.sayHello();