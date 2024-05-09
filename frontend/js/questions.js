import APICall from "../common/APICall.js";
import { appData } from "../common/appData.js";
import CompleteComponent from "../components/main/complete.js";

let optionButtons;
let promptQuestion;
let progressBar;
let questionsCount;
let submitBtn ;

let BUTTONS_IDs = [];
let score=0;
let currentAnswer;
let questionIndex = 0;
let isAnswered = false;
var _apiCall = new APICall();
let questions=[]

document.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'img' ||event.target.tagName.toLowerCase() === 'p') {
        const parentElement = event.target.parentElement;
      if (parentElement.tagName.toLowerCase()==='a' && parentElement.href.includes('quiz')) {
        _apiCall.makeGetRequest(`quiz/start/${getSubjectId()}`)
        .then(response =>{
            console.log(response);
            questions = response.data;
            optionButtons = document.querySelectorAll('options-btn');
            promptQuestion = document.getElementById('prompt-quetions');
            progressBar = document.getElementById('progress-bar');
            questionsCount = document.getElementById('current-question');
            submitBtn = document.getElementById('submit');
                optionButtons.forEach(btn => BUTTONS_IDs.push(btn.id));
                setOptions(questions[questionIndex]);
                attachOptionButtonListeners();
                document.getElementById('subject-name').innerText = getSubjectName();
            
        })
        .catch(error=>{
            console.error('Error while loading quiz : '+error);
        })
      }
    }
  });
function attachOptionButtonListeners() {
    if(optionButtons){
        optionButtons.forEach(btn => {
            btn.addEventListener('click', event => {
                const button = btn.querySelector('button');
                const clickedButtonId = btn.id;
                optionButtons.forEach((buttonElemet) => {
                    buttonElemet
                        .querySelector('button')
                        .classList.remove('btn-options-clicked');
                });
                
                if(clickedButtonId=="submit" &&questionIndex===10){
                    clearSelectedButtons();
                    //saveAttempt();
                    questionIndex +=1;
                    return;
                }else if(questionIndex>=10){
                    clearSelectedButtons();
                    return;
                }
                
                if(clickedButtonId=="submit" && !isAnswered){
                    if(currentAnswer!==undefined && questions[questionIndex].options[BUTTONS_IDs.indexOf(currentAnswer)]==questions[questionIndex].answer){
                        const correctBtn = document.getElementById(currentAnswer).querySelector('button');
                        
                        const asideElement = correctBtn.querySelector('.btn-left');

                        const imgElement = document.createElement('img');
                        imgElement.classList.add('btn-right');
                        imgElement.src = './assets/icons/check.svg';

                        correctBtn.classList.add('btn-options-correct');

                        asideElement.insertAdjacentElement('afterend', imgElement);
                        score +=1;
                        appData.updateScore()
                        changeSubmitButton();

                    }else if(currentAnswer!==undefined){
                        const wrongBtn = document.getElementById(currentAnswer).querySelector('button');
                        const asideElement = wrongBtn.querySelector('.btn-left');
                        const imgElement = document.createElement('img');
                        imgElement.classList.add('btn-right');
                        imgElement.src = './assets/icons/X.svg';
                        wrongBtn.classList.add('btn-options-wrong');
                        asideElement.insertAdjacentElement('afterend', imgElement);
                        
                        const correctAnswerIndex = questions[questionIndex].options.indexOf(questions[questionIndex].answer);
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
                }else if(clickedButtonId=="submit" && isAnswered){
                    setOptions(questions[questionIndex]);
                    return;
                }

                currentAnswer = clickedButtonId;

                button.classList.toggle('btn-options-clicked');
        
            });
        });
    }
}


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
    
    currentAnswer=undefined;
    promptQuestion.innerText = Questions.question;
    progressBar.setAttribute('value',questionIndex+1)
    questionsCount.innerText = questionIndex+1;
    BUTTONS_IDs.forEach((id, i) => {
        console.log(Questions.options[i])
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

function changeSubmitButton(){
    questionIndex +=1;
    submitBtn.classList.remove('btn-options-clicked');
    const pTags = submitBtn.querySelector('p');
    pTags.innerText ='';
    pTags.innerText = questionIndex>=10?`Done `:'Next Question';
    isAnswered = true;
    if(questionIndex===10){
        const completeQuiz = document.createElement('a');
        completeQuiz.href = 'complete';
        completeQuiz.innerText = 'Done';
        completeQuiz.classList.add('btn-complete');
        completeQuiz.classList.add('complete-link')
        submitBtn.parentNode.replaceChild(completeQuiz, submitBtn);
        saveAttempt();
        initialize();
    }
}

function getSubjectId(){
    return appData.getSubjectId();
}
function getSubjectName(){
    return appData.getStubjectName();
}

function clearSelectedButtons(){
    const imgElements = document.querySelectorAll('.btn-right');
    if(imgElements){
        imgElements.forEach(el=>el.remove())
    }   
    
    optionButtons.forEach(button => {
        button.querySelector('button').classList.remove('btn-options-clicked','btn-options-wrong','btn-options-correct');
        button.classList.remove('btn-options-correct');
    });
}

function saveAttempt(){
    const body = {
        subject_id:getSubjectId(),
        score:appData.getScore()
    };
    _apiCall.makePostRequest('attempts',body)
        .then(response=>{
            
        })
        .catch(err=>{
            alert(`An error occured while saving attempt\n${err}`);
        })
}

function initialize(){
    currentAnswer = undefined;
    questionIndex = 0;
    isAnswered = false;
    questions=[];
    BUTTONS_IDs =[];
}
