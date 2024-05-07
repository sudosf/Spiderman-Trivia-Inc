import { Icons,Links } from '../common/constants.js';

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
    const profilePicture = username === 'there' ? `assets/images/default-avatar.jpeg` : `https://github.com/${username}.png`;
    const links = localStorage.getItem('signedIn') === "true" 
                ? ` <a href="leaderboard.html">leaderboard</a>
                    <a href="attempts.html">My attempts</a>
                    <a href="logout.html">logout</a>`
                : `<a href="${Links.serverBaseURL}/auth/github">login</a>
                   `
    this.innerHTML = `
            <header>
                <img class="logo" src=${Icons.logo} alt="logo" />
                <div class="dropdown">
                    <img src=${profilePicture} alt="Avatar" class="avatar">
                    <div class="dropdown-content">
                        <h6 class="dropdown-name">Hello, ${username}</h6>
                        <div class="dropdown-links">
                            <a href="#" id="theme-toggle-btn"> 
                                    <img class="moon" src=${Icons.moon} alt="theme-toggler" />
                                    <span>dark mode</span>
                                </a>
                            ${links}
                        </div>
                    </div>
                </div>
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
