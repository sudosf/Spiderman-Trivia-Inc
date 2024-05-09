class Subject extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name');
        const imageUrl = this.getAttribute('image-url');
        const subjectId = this.getAttribute('subject-id');

        this.innerHTML = `
            <a href="quiz#${subjectId}-${name}" class="subject-container" title="Quiz | ${name}" id="startQuiz">
                <img class="subject-image" src="${imageUrl}" alt="Image of ${name}">
                <p class="subject-name">${name}</p>
            </a>
        `;
    }
}

customElements.define('subject-component', Subject);
