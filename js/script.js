'use strict'

    const openers = document.querySelectorAll('[data-open-modal]');
    const closers = document.querySelectorAll('[data-close-modal]');

    function openModal(id) {
        const dialog = document.getElementById(id);
        if (!dialog) return;
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            dialog.setAttribute('open', '');
        }
        document.body.classList.add('modal-open');
    }

    function closeModal(dialog) {
        if (!dialog) return;
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }
        document.body.classList.remove('modal-open');
    }


    openers.forEach((btn) => {
        btn.addEventListener('click', () => openModal(btn.dataset.openModal));
    });


    closers.forEach((btn) => {
        btn.addEventListener('click', () => closeModal(btn.closest('dialog')));
    });


    document.querySelectorAll('dialog.modal').forEach((dialog) => {
        dialog.addEventListener('click', (e) => {
            const wrapper = dialog.querySelector('.modal__wrapper');
            if (wrapper && !wrapper.contains(e.target)) {
                closeModal(dialog);
            }
        });


        dialog.addEventListener('close', () => {
            document.body.classList.remove('modal-open');
        });
    });
