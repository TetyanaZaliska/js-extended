'use strict';
// replace
// search
// match


// new RegExp('pattern', 'flags');
// /pattern/flags;

// const reg = new RegExp('\W\w', 'g'); 
// const reg = /\w\W/g;
// g - глобально, найти все вхождения
// i - не уситывать регистр
// m - сопоставление по нескольким строкам divided by \n \r

const ans = prompt('Enter your name');

// const reg = /n/ig;
const reg = /\W\d/g;
// console.log(reg.test(ans));
console.log(ans.match(reg));

// const reg = /n/gi;

// console.log(ans.search(reg));
// console.log(ans.match(reg));

// const pass = prompt('Enter your password');

// console.log(pass.replace(/./g, "*"));

// console.log('12-48-75'.replace(/-/g, ':'));