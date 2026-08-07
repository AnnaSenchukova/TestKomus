'use strict'

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

/*script modal*/

if (!('commandForElement' in HTMLButtonElement.prototype)) {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[command="show-modal"], [command="close"]');
        if (!btn) return;
        const dialog = document.getElementById(btn.getAttribute('commandfor'));
        if (!dialog) return;
        e.preventDefault();
        btn.getAttribute('command') === 'show-modal' ? dialog.showModal() : dialog.close();
    });
}

document.querySelectorAll('.modal').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });
});
