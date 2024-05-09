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
            
            <a href=${Links.SourceCode} target="_blank">
                <img class="github clickable" src=${Icons.github} alt='github'>
                <img class="icon clickable" src=${Icons.external} alt='external_link'>
            </a>
        </footer>
        `;
    }
}

customElements.define('app-footer', Footer);
