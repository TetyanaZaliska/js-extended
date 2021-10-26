'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

});

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