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


 
    const menuPictures = ['img/tabs/vegy.jpg', 'img/tabs/elite.jpg', 'img/tabs/post.jpg'],
          menuAlts = ['vegy', 'elite', 'post'],
          menuNames = ['Меню "Фитнес"', 'Меню “Премиум”', 'Меню "Постное"'],
          menuDescriptions = [`Меню "Фитнес" - это новый подход к приготовлению блюд: больше 
                                свежих овощей и фруктов. Продукт активных и здоровых людей. Это 
                                абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
                              `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
                              но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты 
                              - ресторанное меню без похода в ресторан!`, 
                              `Меню “Постное” - это тщательный подбор ингредиентов: полное 
                              отсутствие продуктов животного происхождения, молоко из миндаля, 
                              овса, кокоса или гречки, правильное количество белков за счет тофу и 
                              импортных вегетарианских стейков.`],
          menuPrices = [9, 14, 21];


    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше 
        свежих овощей и фруктов. Продукт активных и здоровых людей. Это 
        абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        9,
        '.menu .container' 
    ).render();
    
    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
        но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты 
        - ресторанное меню без похода в ресторан!`,
        14,
        '.menu .container',
        'menu__item'
    ).render();
    
    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное 
        отсутствие продуктов животного происхождения, молоко из миндаля, 
        овса, кокоса или гречки, правильное количество белков за счет тофу и 
        импортных вегетарианских стейков.`,
        21,
        '.menu .container',
        'menu__item'
    ).render();

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Done! We will contact to you as soon as possible',
        failure: 'Something go wrong'
    };

    forms.forEach(item => postFrom(item));

    // функция с использованием XMLHttpRequest
    // function postFrom(form){
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
    
    
    // функция с использованием fetch
    function postFrom(form){
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
            
            const object = {};
            // formData.forEach((value, key) => object[key] = value);
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            
            const json = JSON.stringify(object);
            
            fetch('server.php', {
                method: "POST",
                //заголовки только для json-обьектов, для формы не надо
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                // body: formData
                body: JSON.stringify(object)
            })
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

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
});

