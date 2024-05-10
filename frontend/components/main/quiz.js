function Quiz() {
    return `
    <main  class="container main-container">
        <section class="questions-container">
            <p>
            <span id="subject-name"></span> - Question <span id="current-question"></span> of 10
            </p>
        <h2 id="prompt-quetions"></h2>
            <progress id="progress-bar" value="0" max="10"></progress>
        </section>

        <section class="options-container">
            <options-btn icon="A" id="opt-1"></options-btn>
            <options-btn icon="B" id="opt-2" ></options-btn>
            <options-btn icon="C" id="opt-3"></options-btn>
            <options-btn icon="D" id="opt-4"></options-btn>
            <options-btn icon="assets/icons/arrow-right.svg" option="Submit answer" isSubmit="true" id="submit"></options-btn>
        </section>
    </main>`;
}

export default Quiz;
