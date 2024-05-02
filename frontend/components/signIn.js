class SignIn extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <main>
            <section>
                <h1>Swing Into the Spider-Verse Trivia Challenge!</h1>
                <p>
                    Ready to test your Spider-Man knowledge? Please sign in to
                    access the trivia challenge and explore the adventures of
                    your favorite Spider-Man. Start your heroic journey now!
                </p>
            </section>

            <button class="btn-long btn-sign-in">
                <img src="assets/icons/github.svg" alt="github" />
                Sign in with GitHub
            </button>
        </main>
        `;
  }
}

customElements.define('app-signin', SignIn);
