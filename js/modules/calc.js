function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');
    let sex = localStorage.getItem("sex") || setLocalStorage("sex", 'female'),
        age, weight, height, 
        ratio = localStorage.getItem("ratio") || setLocalStorage("ratio", 1.375);

    function setLocalStorage(itemName, value) {
        localStorage.setItem(itemName, value);
        return value;
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    function calcTotal() { 
        // console.log(sex, age, weight, height, ratio);
        if (!age || !sex || !weight || !height || !ratio) {
            result.textContent = '_____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*ratio);
        } 

    }

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    // setLocalStorage("ratio", ratio);
                    localStorage.setItem("ratio", ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    // setLocalStorage("sex", 'female');
                    localStorage.setItem("sex", sex);
                } 
                
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        }); 
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
 
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'inherit';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value; 
                    break;
                case 'weight':
                    weight = +input.value; 
                    break;
                case 'age':
                    age = +input.value; 
                    break;
            }

            calcTotal();
        }); 

    }
    
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    calcTotal();
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;