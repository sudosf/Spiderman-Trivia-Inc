function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
      return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
      }[match];
  });
}
class Header extends HTMLElement {
  connectedCallback() {
    const rawUsername = localStorage.getItem('signedIn') === "true" ? localStorage.getItem('username') : "there";
    const username = escapeHTML(rawUsername);

    this.innerHTML = `
        <header class="container">
            <img src="assets/icons/logo.svg" alt="logo" />
  
            <aside>
                <img src="assets/icons/moon.svg" alt="theme-toggler" id="mode-toggle-btn" />
                <h6>Hello, ${username}</h6>
            </aside>
        </header>
        `;
    }
}

customElements.define('app-header', Header);
