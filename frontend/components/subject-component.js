class Subject extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name');
        const imageUrl = this.getAttribute('image-url');

        this.innerHTML = `
            <div class="subject-container">
                <img class="subject-image" src="${imageUrl}" alt="Image of ${name}">
                <p class="subject-name">${name}</p>
            </div>
        `;
    }
}

customElements.define('subject-component', Subject);
