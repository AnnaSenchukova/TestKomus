'use strict'

/* Modal */
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
    document.body.classList.remove('modal-close');
    document.body.classList.add('modal-open');
}

function closeModal(dialog) {
    if (!dialog) return;

    document.body.classList.remove('modal-open');
    document.body.classList.add('modal-close');

    if (typeof dialog.close === 'function') {
        dialog.close();
    } else {
        dialog.removeAttribute('open');
    }
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

    const wrapper = dialog.querySelector('.modal__wrapper');
    if (wrapper) {
        wrapper.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'transform') return;
            if (!dialog.open && document.body.classList.contains('modal-close')) {
                document.body.classList.remove('modal-close');
            }
        });
    }

    dialog.addEventListener('close', () => {
        document.body.classList.remove('modal-open');

        if (!wrapper || getComputedStyle(wrapper).transitionDuration === '0s') {
            document.body.classList.remove('modal-close');
        }
    });
});


/* script faq */
    var answer = document.querySelectorAll('.faq__answer');
    var questionButtons = document.querySelectorAll('.faq__question');

    function buttonArrowClose(item) {
        item.classList.remove('faq__question--arrow-up');
        item.classList.add('faq__question--arrow-down');
    }

    function buttonArrowOpen(item) {
        item.classList.remove('faq__question--arrow-down');
        item.classList.add('faq__question--arrow-up');
    }

    function answerClose(currentContent) {
        currentContent.classList.remove('faq__answer--nojs');
        currentContent.classList.remove('faq__answer--open');
        currentContent.classList.add('faq__answer--close');
    }

    function answerOpen(currentContent) {
        questionButtons.forEach((item) => {
            buttonArrowClose(item);
        });

        answer.forEach((item) => {
            answerClose(item);
        });
        currentContent.classList.remove('faq__answer--close');
        currentContent.classList.add('faq__answer--open');
    }

    answer.forEach((item, i) => {
        answerClose(item);
    });

    questionButtons.forEach(function(item, i) {
        buttonArrowClose(item);

        item.addEventListener('click', function(e) {
            if (answer[i].classList.contains('faq__answer--close')) {
                answerOpen(answer[i]);
                buttonArrowOpen(item);
            }
            else {
                answerClose(answer[i]);
                buttonArrowClose(item);
            }
        });
    });

if (answer.length > 0 && questionButtons.length > 0) {
    answerOpen(answer[0]);
    buttonArrowOpen(questionButtons[0]);
}

