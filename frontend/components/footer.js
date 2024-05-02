class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
            <p>
            &copy;
                ${new Date().getFullYear()}
            SpiderMan Trivia Inc.
            </p>
    
            <img src='assets/icons/github.svg' alt='github'>
        </footer>
        `;
  }
}

customElements.define('app-footer', Footer);
