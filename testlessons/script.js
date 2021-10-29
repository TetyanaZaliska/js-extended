'use strict';

const box = document.querySelector('.box'),
      btn = document.querySelector('button');

// const width = box.clientWidth;
// const height = box.clientHeight;
// const width = box.offsetWidth;
// const height = box.offsetHeight;
const width = box.scrollWidth;
const height = box.scrollHeight;

console.log(width, height);

btn.addEventListener('click', () => {
    // box.style.height = box.scrollHeight + 'px';
    console.log(box.scrollTop);
});

console.log(box.getBoundingClientRect().top);


// const style = window.getComputedStyle(box);
const style = window.getComputedStyle(box, ":hover");

console.log(style.display);

console.log(document.documentElement.scrollTop);
console.log(document.documentElement.clientWidth);

document.documentElement.scrollTop = 50;

// прокрутить на 100 дальше
window.scrollBy(0, 100);

// прокрутить на позицию 100 
window.scrollTo(0, 100);