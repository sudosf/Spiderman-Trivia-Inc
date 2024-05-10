import { Links, Icons, User } from '../common/constants.js';

class HomeContent extends HTMLElement {
    connectedCallback() {
        if (User.signedIn) {
            this.innerHTML = `
            <subjects-component></subjects-component>
    `;
        } else {
            this.innerHTML = `
        <a href="${Links.serverBaseURL}/auth/github" class="btn btn-sign-in">
            <img class="github" src=${Icons.github} alt="github" />
            Sign in with GitHub
        </a>
    `;
        }
    }
}

customElements.define('home-content', HomeContent);
