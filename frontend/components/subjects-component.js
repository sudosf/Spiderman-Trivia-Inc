class Subjects extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="subjects-container">
                <subject-component name="Classic"
                image-url="assets/images/classic.png"></subject-component>
                <subject-component name="Amazing"
                image-url="assets/images/amazing.png"></subject-component>
                <subject-component name="MCU"
                image-url="assets/images/mcu.png"></subject-component>
                <subject-component name="Next-Gen"
                image-url="assets/images/nextgen.png"></subject-component>
            </div>
        `;
    }
}

customElements.define('subjects-component', Subjects);
