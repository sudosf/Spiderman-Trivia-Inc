import { Icons, Links } from '../common/constants.js';

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p>
            &copy;
                ${new Date().getFullYear()}
            SpiderMan Trivia Inc.
            </p>
            
            <a target="_blank">
                <img class="github clickable" src=${Icons.github} alt='github'>
            </a>
        </footer>
        `;
    }
}

customElements.define('app-footer', Footer);
