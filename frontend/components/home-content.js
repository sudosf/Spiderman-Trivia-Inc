import { Links, Icons } from '../common/constants.js';

class HomeContent extends HTMLElement {
  connectedCallback() {
    if(localStorage.getItem('signedIn') === "true"){
        this.innerHTML = `
            <subjects-component></subjects-component>
    `;
    }else{
        this.innerHTML = `
        <button href="${Links.serverBaseURL}/auth/github" class="btn-sign-in">
            <img class="github" src=${Icons.github} alt="github" />
            Sign in with GitHub
        </button>
    `;
    }
  }
}

customElements.define('home-content', HomeContent);
