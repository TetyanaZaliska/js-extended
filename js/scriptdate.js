'use strict';

const now = new Date();
// new Date.parse('2021-10-27');


console.log(now.setHours(10)); 
console.log(now);

console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getUTCHours());
console.log(now.getUTCDay());
console.log(now.getUTCDate());


console.log(now.getTimezoneOffset());
console.log(now.getTime());

const start = new Date();

for (let i = 0; i < 100000; i++) {
    let some = i ** 3;
}

const end = new Date();

console.log(`Current cicle time is ${end - start} milliseconds`);



const btn = document.querySelector('.header__right-block .btn'),
      abtn = document.querySelector('.social .subtitle');
let timerId,
    i = 0;


function myAnimation() {
    const logo = document.querySelector('.header__logo');
    let pos = -20;

    const timerId = setInterval(frame, 10);

    function frame() { 
        if (pos === 20) {
            clearInterval(timerId);
        } else {
            logo.style.marginTop = pos + 'px';
            logo.style.marginLeft = pos + 'px';
            pos++;
            console.log(pos+'px');
        }
    }

    
}

// timerId = setInterval(myAnimation, 10);
// abtn.addEventListener('click', myAnimation);
btn.addEventListener('click', myAnimation);

// btn.addEventListener('click', () => {
//     // timerId = setTimeout(logger, 2000);
//     timerId = setInterval(logger, 10);
// });

// // const timerId = setTimeout(logger, 2000);

// function logger() {
//     if (i === 3) {
//         clearInterval(timerId);
//     }
//     console.log('text'); 
//     i++;
// }

// let id = setTimeout(function log() {
//     console.log('setTimeout'+id);
//     id = setTimeout(log, 500);
// }, 500);