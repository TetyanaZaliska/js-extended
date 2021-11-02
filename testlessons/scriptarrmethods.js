'use strict';

// // filter

// const names = ['Ivan', 'Anna', 'Ksenia', 'Voldermar'];

// // const shortNames = array.filter(name => name.length < 5);
// const shortNames = array.filter(function(name) {
//     return name.length < 5;
// });

// console.log(shortNames);

// // map

// const answers = ['AnnA', 'IvAn', 'Hello'];

// const answersLowerCase = answers.map(answer => answer.toLowerCase());

// console.log(answersLowerCase);

// // every/some

// const someArr = [4, 'dfsdsv', 'wfw'];

// const some = someArr.some(item => typeof(item) === 'number');

// console.log(some);

// const every = someArr.every(item => typeof(item) === 'number');

// console.log(every);

// // reduce

// // const numbers = [4, 5, 1, 3, 2, 6]; 
// // const summary = numbers.reduce((sum, current) => sum + current, 100); 
// // console.log(summary);

// const fruits = ['apple', 'banana', 'lime'];

// const joinstr = fruits.reduce((str, curr) => `${str}, ${curr}`);
// console.log(joinstr);


const obj = {
    anna: 'persone',
    ivan: 'persone',
    cat: 'animal',
    dog: 'animalsd9hyo`'
};

const persones = Object.entries(obj)
                .filter(item => item[1] === 'persone')
                .map(item => item[0]);

console.log(persones);