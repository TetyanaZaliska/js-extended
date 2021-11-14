require('es6-promise').polyfill();

import tabs from './modules/tabs';
import timer from './modules/timer';
import modals from './modules/modals';
import cards from './modules/cards';
import forms from './modules/forms';
import sliders from './modules/sliders';
import calc from './modules/calc';
import {openModal} from './modules/modals';

document.addEventListener('DOMContentLoaded', () => { 
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-11-25 14:15');
    modals('.modal', '[data-modal]', 'data-close', modalTimerId);
    cards();
    forms('form', '.modal', modalTimerId);
    sliders({
        container: '.offer__slider',
        nextArrow: '.offer__slider-prev',
        prevArrow: '.offer__slider-next',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc(); 
    
});

