class HomeContent extends HTMLElement {
  connectedCallback() {
    if(localStorage.getItem('signedIn') === "true"){
        this.innerHTML = `
            <subjects-component></subjects-component>
    `;
    }else{
        this.innerHTML = `
        <a href="http://spiderman-trivia-api.eu-west-1.elasticbeanstalk.com/api/auth/github" class="btn-long btn-sign-in">
            <img src="assets/icons/github.svg" alt="github" />
            Sign in with GitHub
        </a>
    `;
    }
  }
}

customElements.define('home-content', HomeContent);
