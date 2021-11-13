'use strict';

try {
    console.log('Normal');
    console.log(a);
    console.log('some other try inctructions');
} catch(err) {
    console.log("Error");
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
} finally {
    console.log('Run after try or catch instructions');
}

console.log('go to other script instruction');

try {
    document.querySelector('.active').addEventListener('click', () => {
        console.log('clicked');
    });
} catch(e) {}

console.log('go to other script instruction');