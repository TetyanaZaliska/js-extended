'use strict';

localStorage.setItem('number', 5);

console.log(localStorage.getItem('number'));

const checkbox = document.querySelector('#checkbox'),
      btn = document.querySelector('button'),
      box = document.querySelector('.box');

    if (localStorage.getItem('whatColor')) {
        box.style.background = localStorage.getItem('whatColor');
    }
    if (localStorage.getItem('isCheck')) {
        checkbox.checked = true;
    }

    btn.addEventListener('click', () => {
        if (localStorage.getItem('whatColor')) {
            box.style.background = '#fff';
            localStorage.removeItem('whatColor'); 
        } else {
            localStorage.setItem('whatColor', 'red');
            box.style.background = 'red'; 
        }
    });

    checkbox.addEventListener('change', () => {
        if (localStorage.getItem('isCheck')) {
            localStorage.removeItem('isCheck'); 
        } else {
            localStorage.setItem('isCheck', true);
        }
    });

    const persone = {
        name: 'Alex',
        age: 31
    };

    localStorage.setItem('persone', JSON.stringify(persone));

    console.log(JSON.parse(localStorage.getItem('persone')));