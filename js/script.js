'use strict'

const OPEN_CLASS = 'is-open';
const MOBILE_MQ = window.matchMedia('(max-width: 559px)');

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

    requestAnimationFrame(() => {
        requestAnimationFrame(() => dialog.classList.add(OPEN_CLASS));
    });
}

function closeModal(dialog) {
    if (!dialog) return;

    const wrapper = dialog.querySelector('.modal__wrapper');
    const isMobile = MOBILE_MQ.matches;

    const finish = () => {
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }
        document.body.classList.remove('modal-open');
    };

    dialog.classList.remove(OPEN_CLASS);

    if (isMobile && wrapper) {
        wrapper.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName !== 'transform') return;
            wrapper.removeEventListener('transitionend', onEnd);
            finish();
        });
    } else {
        finish();
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

    dialog.addEventListener('close', () => {
        dialog.classList.remove(OPEN_CLASS);
        document.body.classList.remove('modal-open');
    });
});



/* script accordion */

function ready() {
    var answer = document.querySelectorAll('.accordion__answer');
    var questionButtons = document.querySelectorAll('.accordion__question');

    function buttonArrowClose(item) {
        item.classList.remove('accordion__question--arrow-up');
        item.classList.add('accordion__question--arrow-down');
    }

    function buttonArrowOpen(item) {
        item.classList.remove('accordion__question--arrow-down');
        item.classList.add('accordion__question--arrow-up');
    }

    function answerClose(currentContent) {
        currentContent.classList.remove('accordion__answer--nojs');
        currentContent.classList.remove('accordion__answer--open');
        currentContent.classList.add('accordion__answer--close');
    }

    function answerOpen(currentContent) {
        questionButtons.forEach((item) => {
            buttonArrowClose(item);
        });

        answer.forEach((item) => {
            answerClose(item);
        });
        currentContent.classList.remove('accordion__answer--close');
        currentContent.classList.add('accordion__answer--open');
    }

    answer.forEach((item, i) => {
        answerClose(item);
    });

    questionButtons.forEach(function(item, i) {
        buttonArrowClose(item);

        item.addEventListener('click', function(e) {
            if (answer[i].classList.contains('accordion__answer--close')) {
                answerOpen(answer[i]);
                buttonArrowOpen(item);
            }
            else {
                answerClose(answer[i]);
                buttonArrowClose(item);
            }
        });
    });
}
