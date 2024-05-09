import { Icons } from '../common/constants.js';

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p>
            &copy;
                ${new Date().getFullYear()}
            SpiderMan Trivia Inc.
            </p>
            
            <img class="github" src=${Icons.github} alt='github'>
        </footer>
        `;
    }
}

customElements.define('app-footer', Footer);
