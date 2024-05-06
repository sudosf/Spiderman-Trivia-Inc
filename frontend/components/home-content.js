import { Links, Icons } from '../common/constants.js';

class HomeContent extends HTMLElement {
  connectedCallback() {
    if(localStorage.getItem('signedIn') === "true"){
        this.innerHTML = `
            <subjects-component></subjects-component>
    `;
    }else{
        this.innerHTML = `
        <a href="${Links.serverBaseURL}/auth/github" class="btn-long btn-sign-in">
            <img src=${Icons.github} alt="github" />
            Sign in with GitHub
        </a>
    `;
    }
  }
}

customElements.define('home-content', HomeContent);
