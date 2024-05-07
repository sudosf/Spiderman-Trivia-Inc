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
        <style>
          aside h6 {
            text-decoration: underline;
            cursor: pointer;
            position: relative;
          }
          .dropdown-menu {
            display: none;
            position: absolute;
            background-color: var(--card-bg-color);
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            top:60px;
          }
          .dropdown-menu a {
            color: var(--text-color);
            padding: 12px 16px;
            text-decoration: none;
            display: block;
          }
          .dropdown-menu a:hover {
            background-color: var(--accent-color);
            transform: scale(1.05);
            box-shadow: 0 0 1em var(--accent-color);
          }
        </style>
        <header>
            <img src=${Icons.logo} alt="logo" />
  
            <aside>
                <img id="theme-toggle-btn" src=${Icons.moon} alt="theme-toggler" />
                <h6 tabindex="0">Hello, ${username}</h6>
                <div class="dropdown-menu">
                    <a href="/quiz-attempts">Quiz Attempts</a>
                    <a href="/logout">Logout</a>
                </div>
            </aside>
        </header>
        `;

    this.querySelector('h6').addEventListener('click', this.toggleDropdown);
   
  }
  toggleDropdown = () => {
    const dropdownMenu = this.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  }
}

customElements.define('app-header', Header);
