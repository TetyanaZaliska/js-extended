'use strict';

// console.log('Request data...');

// const req = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Preparing data...');
    
//         const product = {
//             name: "TV",
//             price: 2000
//         };
    
//         resolve(product);
//         // reject();
//     }, 2000);
// });

// req.then(product => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';
//             resolve(product);
//             // reject();
//         }, 1000);
//     });
// }).then(data => {
//     data.modify = 'true'; 
//     return data;
// }).then(data => { 
//     console.log(data);
// }).catch(() => {
//     console.error('Something go wrong');
// }).finally(() => {
//     console.log('Finnaly');
// });


const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
};

// test(1000).then(() => console.log('1000'));
// test(2000).then(() => console.log('2000'));

Promise.all([test(1000), test(2000)]).then(() => console.log('All'));
Promise.race([test(1000), test(2000)]).then(() => console.log('race'));
