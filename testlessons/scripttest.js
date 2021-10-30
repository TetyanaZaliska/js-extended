'use strict';

const log = function (a, b, ...rest) {
    console.log(a, b, rest);
};

log('one', 'two', 'three', 'four', 'five');

function calcOrDouble(num, basis = 2) {
    // basis = basis || 2;
    console.log(num*basis);
}

calcOrDouble(3);
calcOrDouble(3, 5);