class Subject extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name');
        const imageUrl = this.getAttribute('image-url');
        const subjectId = this.getAttribute('subject-id');

        this.innerHTML = `
            <a href="questions.html#subjectId=${subjectId}&subjectName=${name}" class="subject-container">
                <img class="subject-image" src="${imageUrl}" alt="Image of ${name}">
                <p class="subject-name">${name}</p>
            </a>
        `;
    }
}

customElements.define('subject-component', Subject);
