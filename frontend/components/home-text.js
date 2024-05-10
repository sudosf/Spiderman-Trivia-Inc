import { User } from '../common/constants.js';

class HomeText extends HTMLElement {
    connectedCallback() {
        if (User.signedIn) {
            this.innerHTML = `
        <p>
          Choose your Spider-Man and test your knowledge of their adventures! 
          Each hero brings a unique set of questions from their iconic films. 
          Are you ready to see how much you really know?
        </p>
    `;
        } else {
            this.innerHTML = `
        <p>
          Ready to test your Spider-Man knowledge? Please sign in to
          access the trivia challenge and explore the adventures of
          your favorite Spider-Man. Start your heroic journey now!
        </p>
    `;
        }
    }
}

customElements.define('home-text', HomeText);
