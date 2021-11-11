'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          timer = require('./modules/timer'), 
          modals = require('./modules/modals'), 
          cards = require('./modules/cards'), 
          forms = require('./modules/forms'), 
          sliders = require('./modules/sliders'),  
          calc = require('./modules/calc');

    tabs();
    timer();
    modals();
    cards();
    forms();
    sliders();
    calc(); 
    
});

