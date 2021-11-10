'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Tabs

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
 
    // Timer 

    const deadline = '2021-11-10 14:15';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000 ) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
  
    function showDeadline(deadline) {
        deadline = new Date(Date.parse(deadline));
        const timerEnd = document.querySelector('#timerEnd'); 
  
        timerEnd.innerHTML = deadline.getFullYear() + '-' + 
                            getZero(deadline.getMonth() + 1) + '-' + 
                            getZero(deadline.getDate()) + ' в ' + 
                            getZero(deadline.getHours()) + ':' + 
                            getZero(deadline.getMinutes()) + ':' + 
                            getZero(deadline.getSeconds());
    }

    showDeadline(deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),//document.querySelectorAll('button'),
          modal = document.querySelector('.modal');

    
    function openModal() {
        // modal.style.display = 'block';
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => { 
        btn.addEventListener('click', openModal); 
    });

    function closeModal() {
        // modal.style.display = 'none';
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    } 

    modal.addEventListener('click', (e) => {
        // if (event.target === modal) {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();           
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Our day menu
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = ` 
                                    <img src=${this.src} alt=${this.alt}>
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                    <div class="menu__item-descr">${this.descr}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>
                                `;
            this.parent.append(element);
        } 
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch url: ${url}, server respond with status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(obj => {
    //         obj.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
    
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const usdRate = 27;
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = ` 
    //                             <img src=${img} alt=${altimg}>
    //                             <h3 class="menu__item-subtitle">${title}</h3>
    //                             <div class="menu__item-descr">${descr}</div>
    //                             <div class="menu__item-divider"></div>
    //                             <div class="menu__item-price">
    //                                 <div class="menu__item-cost">Цена:</div>
    //                                 <div class="menu__item-total"><span>${price*usdRate}</span> грн/день</div>
    //                             </div>
    //                         `;
    //         document.querySelector('.menu .container').append(element);
                
    //     });
    // }
 
    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Done! We will contact to you as soon as possible',
        failure: 'Something go wrong'
    };

    forms.forEach(item => bindPostData(item));

    // функция с использованием XMLHttpRequest
    // function postData(form){
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         // const statusMessage = document.createElement('div');
    //         // statusMessage.classList.add('status');
    //         // statusMessage.textContent = message.loading;
    //         // form.append(statusMessage);
    //         const statusMessage = document.createElement('img');
    //         statusMessage.src = message.loading;
    //         // statusMessage.style.cssText = `
    //         //     display: block;
    //         //     margin: 0 auto;
    //         // `;
    //         statusMessage.classList.add('img_spinner');
    //         // form.append(statusMessage);
    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const request = new XMLHttpRequest(); 
    //         request.open('POST', 'server.php');

    //         const formData = new FormData(form);
            
    //         const object = {};
    //         // formData.forEach((value, key) => object[key] = value);
    //         formData.forEach(function(value, key) {
    //             object[key] = value;
    //         });
            
    //         const json = JSON.stringify(object);

    //         // для форм-даты заголовок не нужен
    //         // // request.setRequestHeader('Content-type', 'multipart/form-data; charset=utf-8');
    //         // request.send(formData); 
            
    //         // для json даты заголовок нужен
    //         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //         request.send(json); 

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 showThanksModal(message.success);
    //                 form.reset(); 
    //                 statusMessage.remove();
    //             } else {
    //                 showThanksModal(message.failure);
    //             }
    //         });

    //     });
    // }
    
    const postData = async (url, data) => {
        const res = await fetch(url, { 
            method: "POST", 
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }, 
            body: data
        });
        return await res.json();
    };

    // функция с использованием fetch
    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // const statusMessage = document.createElement('div');
            // statusMessage.classList.add('status');
            // statusMessage.textContent = message.loading;
            // form.append(statusMessage);
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            // statusMessage.style.cssText = `
            //     display: block;
            //     margin: 0 auto;
            // `;
            statusMessage.classList.add('img_spinner');
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
 
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
             
            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success); 
                statusMessage.remove();
            })
            .catch(() => showThanksModal(message.failure))
            .finally(() => form.reset());  

        });
    }
    
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    // Slider

    const slider = document.querySelector('.offer__slider');

    function getSZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // showSimpleSlider(slider);
    showBeutifulSlider(slider);

    function showBeutifulSlider(slider) {
        const allSliders = slider.querySelectorAll('.offer__slide'),
              current = slider.querySelector('#current'),
              total = slider.querySelector('#total'),
              slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
              slidesField = slider.querySelector('.offer__slider-inner'),
              width = window.getComputedStyle(slidesWrapper).width;
        
        let slideIndex = 1;
        let offset = 0;

        slidesField.style.width = 100 * allSliders.length + '%';
        slidesField.style.transition = '0.5s all';
        slidesField.style.display = 'flex';

        slidesWrapper.style.overflow = 'hidden';


        allSliders.forEach(slide => slide.style.width = width);

        slider.style.position = 'relative';
        const indicators = document.createElement('ol'),
              dots = [];
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

        for (let i = 0; i < allSliders.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        } 
        
        

        slidesField.style.transform = `translateX(-${offset}px)`;

        const showBSlide = (num) => {
            current.innerHTML = getSZero(num);
            total.innerHTML = getSZero(allSliders.length);  

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[num - 1].style.opacity = '1';
        };

        showBSlide(slideIndex);

        function deleteNotDigits(str) {
            return +str.replace(/\D/g, "");
        }

        function plusSlides(n) {
            slideIndex += n;
            offset = offset + n*deleteNotDigits(width);

            if (slideIndex > allSliders.length) {
                slideIndex = 1;  
                offset = 0;
            }
            if (slideIndex < 1) {
                slideIndex = allSliders.length;  
                offset = deleteNotDigits(width) * (allSliders.length - 1);
            }
            showBSlide(slideIndex);  
            
        } 
 
        slider.querySelector('.offer__slider-prev').addEventListener('click', (e) => { 
            plusSlides(-1);  
        });

        slider.querySelector('.offer__slider-next').addEventListener('click', (e) => { 
            plusSlides(1); 
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = deleteNotDigits(width) * (slideIndex - 1);
                showBSlide(slideIndex);  
            });
        });
    }

    function showSimpleSlider(slider) { 
        const allSliders = slider.querySelectorAll('.offer__slide'),
              current = slider.querySelector('#current'),
              total = slider.querySelector('#total');
        
        let slideIndex = 1;

 
        const showSlide = (num) => {
            current.innerHTML = getSZero(num);
            total.innerHTML = getSZero(allSliders.length);

            // allSliders.forEach(item => item.style.display = 'none');
            // allSliders[num-1].style.display = 'block';

            allSliders.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            }); 
            allSliders[num-1].classList.add('show');
            allSliders[num-1].classList.remove('hide');
        };

        showSlide(slideIndex);

        function plusSlides(n) {
            slideIndex += n;
            if (slideIndex > allSliders.length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = allSliders.length;
            }
            showSlide(slideIndex);
        } 
 
        slider.querySelector('.offer__slider-prev').addEventListener('click', (e) => { 
            plusSlides(-1);
        });

        slider.querySelector('.offer__slider-next').addEventListener('click', (e) => { 
            plusSlides(1);
        });
 
    }

    // Пример как работает fetch - сайт где можно быстро протестить
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({name: 'Alex'})
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));


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
});

