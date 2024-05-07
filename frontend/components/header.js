import { Icons } from '../common/constants.js';

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
        <header>
            <img class="logo" src=${Icons.logo} alt="logo" />
  
            <aside>
                <img class="moon" id="theme-toggle-btn" src=${Icons.moon} alt="theme-toggler" />
                <h6>Hello, ${username}</h6>
            </aside>
        </header>
        `;
    }
}

customElements.define('app-header', Header);
