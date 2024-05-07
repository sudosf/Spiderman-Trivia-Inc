const optionButtons = document.querySelectorAll('options-btn');
const promptQuestion = document.getElementById('prompt-quetions');
const progressBar = document.getElementById('progress-bar');
const questionsCount = document.getElementById('current-question');
const submitBtn = document.getElementById('submit');

const BUTTONS_IDs = [];
let correctAnswers = [];
let CURRENT_ANSWER;
let QUESTION_INDEX = 0;
let isAnswered = false;

let questions = [
    {
        question: 'What job does Peter Parker have?',
        options: [
            'High School Teacher',
            'Professional Photographer',
            'Freelance Journalist',
            'Lab Assistant',
        ],
        correct: 'High School Teacher',
    },
    {
        question: "Who is Peter Parker's biological father?",
        options: ['Messi', 'Sundowns', 'Real Madrid', 'Men United'],
        correct: 'Real Madrid',
    },
]; //To be removed

document.addEventListener('DOMContentLoaded', () => {
    optionButtons.forEach((btn) => {
        BUTTONS_IDs.push(btn.id);
    });

    setOptions(questions[QUESTION_INDEX]);
});

optionButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const clickedButtonId = btn.id;

        const button = btn.querySelector('button');
        optionButtons.forEach((buttonElemet) => {
            buttonElemet
                .querySelector('button')
                .classList.remove('btn-options-clicked');
        });

        if (clickedButtonId == 'submit' && !isAnswered) {
            if (
                CURRENT_ANSWER !== undefined &&
                questions[QUESTION_INDEX].options[
                    BUTTONS_IDs.indexOf(CURRENT_ANSWER)
                ] == questions[QUESTION_INDEX].correct
            ) {
                const correctBtn = document
                    .getElementById(CURRENT_ANSWER)
                    .querySelector('button');

                const asideElement = correctBtn.querySelector('.btn-left');

                const imgElement = document.createElement('img');
                imgElement.classList.add('btn-right');
                imgElement.src = './assets/icons/check.svg';

                correctBtn.classList.add('btn-options-correct');

                asideElement.insertAdjacentElement('afterend', imgElement);
                changeSubmitButton();
            } else if (CURRENT_ANSWER !== undefined) {
                const wrongBtn = document
                    .getElementById(CURRENT_ANSWER)
                    .querySelector('button');
                const asideElement = wrongBtn.querySelector('.btn-left');
                const imgElement = document.createElement('img');
                imgElement.classList.add('btn-right');
                imgElement.src = './assets/icons/X.svg';
                wrongBtn.classList.add('btn-options-wrong');
                asideElement.insertAdjacentElement('afterend', imgElement);

                const correctAnswerIndex = questions[
                    QUESTION_INDEX
                ].options.indexOf(questions[QUESTION_INDEX].correct);
                const correctAnserId = BUTTONS_IDs[correctAnswerIndex];
                const correctBtn = document.getElementById(correctAnserId);
                const asideElementCorrect =
                    correctBtn.querySelector('.btn-left');

                const imgElementCorrect = document.createElement('img');
                imgElementCorrect.classList.add('btn-right');
                imgElementCorrect.src = './assets/icons/check.svg';
                correctBtn.classList.add('btn-options-correct');
                asideElementCorrect.insertAdjacentElement(
                    'afterend',
                    imgElementCorrect,
                );
                changeSubmitButton();
            }
            return;
        } else if (clickedButtonId == 'submit' && isAnswered) {
            setOptions(questions[QUESTION_INDEX]);
        }

        CURRENT_ANSWER = clickedButtonId;

        button.classList.toggle('btn-options-clicked');
        console.log(submitBtn.classList);
    });
});

function setOptions(Questions) {
    const imgElements = document.querySelectorAll('.btn-right');
    if (imgElements) {
        imgElements.forEach((el) => el.remove());
    }

    optionButtons.forEach((button) => {
        button
            .querySelector('button')
            .classList.remove(
                'btn-options-clicked',
                'btn-options-wrong',
                'btn-options-correct',
            );
        button.classList.remove('btn-options-correct');
    });

    CURRENT_ANSWER = undefined;
    promptQuestion.innerText = Questions.question;
    progressBar.setAttribute('value', QUESTION_INDEX + 1);
    questionsCount.innerText = QUESTION_INDEX + 1;
    BUTTONS_IDs.forEach((id, i) => {
        const opt = document.getElementById(id);
        const paragraphs = opt.querySelectorAll('p');
        if (id == 'submit') {
            paragraphs[0].innerText = 'Submit answer';
        } else {
            paragraphs[1].innerText = Questions.options[i];
        }
    });
    isAnswered = false;
}

function changeSubmitButton() {
    const pTags = submitBtn.querySelector('p');
    pTags.innerText = '';
    pTags.innerText = 'Next Question';
    isAnswered = true;
    QUESTION_INDEX += 1;
}
