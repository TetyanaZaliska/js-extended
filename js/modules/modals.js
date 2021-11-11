function modals() {
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
}

module.exports = modals;