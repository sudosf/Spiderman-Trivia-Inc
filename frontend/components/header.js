class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="container">
            <img src="assets/icons/logo.svg" alt="logo" />
  
            <aside>
                <img src="assets/icons/moon.svg" alt="theme-toggler" id="mode-toggle-btn" />
                <h6>Hello, there</h6>
            </aside>
        </header>
        `;
    }
}

customElements.define('app-header', Header);
