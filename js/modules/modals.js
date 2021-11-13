
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    // modal.style.display = 'block';
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
 
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    // modal.style.display = 'none';
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
} 


function modals(modalSelector, modalTriggerSelector, closeSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(modalTriggerSelector),//document.querySelectorAll('button'),
          modal = document.querySelector(modalSelector);

    

    modalTrigger.forEach(btn => { 
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); 
    });


    modal.addEventListener('click', (e) => {
        // if (event.target === modal) {
        if (e.target === modal || e.target.getAttribute(closeSelector) == '') {
            closeModal(modalSelector);           
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modals;
export default modals;
export {openModal, closeModal};