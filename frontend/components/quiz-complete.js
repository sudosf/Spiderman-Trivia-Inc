import { appData } from '../common/appData.js';

class QuizComplete extends HTMLElement {
    connectedCallback() {
        const scoreType = appData.getStubjectName();
        const score = appData.getScore();

        this.innerHTML = `
            <article class="quiz-complete">
                <section class="quiz-info">
                    <h1>Quiz complete!</h1>
                    <div class="spidey"></div>
                    <p>
                        Whether you've soared to great heights or
                        are just embarking on your journey, always
                        remember: every hero's path is enriched with
                        valuable lessons and growth opportunities.
                        Feel free to immerse yourself in another round
                        of challenges or explore alternative versions to
                        delve deeper into the vast web of knowledge that
                        the Spider-Verse holds!
                    </p>
                </section>

                <section class="score-container">
                    <div class="score-wrapper">
                        <p class="score-type">${scoreType}</p>
                        <h1>${score} / 10</h1>
                        <img src="./assets/images/meme.png" class="imgs" alt="meme">
                        <a href="leaderboard"><button class="w-full flex justify-center bg-primary">View Leaderboard</button></a>
                    </div>
                    <div class="button-container w-full flex flex-wrap gap-1">
                        <a href="attempts" class="flex-1"><button class="button past-attempts  w-full flex justify-center">
                            <span><img src="./assets/icons/eye.svg" /></span>Attempts
                        </button></a>
                        <a href="/" class="flex-1"><button class="button play-again  w-full flex justify-center">
                            <span><img class="white-icon" src="./assets/icons/arrow-right.svg" /></span>Play Again
                        </button></a>
                    </div>
                </section>
            </article>
        `;
    }
}

customElements.define('quiz-complete', QuizComplete);
