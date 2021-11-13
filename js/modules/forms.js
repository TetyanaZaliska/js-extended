import {openModal, closeModal} from './modals';
import { postData } from '../services/services';


function forms(formSelector, modalSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

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
        openModal(modalSelector, modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
        `;

        document.querySelector(modalSelector).append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modalSelector);
        }, 4000);

    }

}

// module.exports = forms;
export default forms; 