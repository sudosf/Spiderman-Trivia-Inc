import { Icons,Links, User} from '../common/constants.js';
class Header extends HTMLElement {
  connectedCallback() {
    const links = User.signedIn === "true" 
                ? ` <a href="leaderboard.html">leaderboard</a>
                    <a href="attempts.html">My attempts</a>
                    <a href="logout.html">Sign out</a>`
                : `<a href="${Links.serverBaseURL}/auth/github">login</a>
                   `
    this.innerHTML = `
            <header>
                <img class="logo" src=${Icons.logo} alt="logo" />
                <div class="dropdown">
                    <img src=${User.profilePictureUrl} alt="Avatar" class="avatar">
                    <div class="dropdown-content">
                        <h6 class="dropdown-name">Hello, ${User.username}</h6>
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
  }
}

customElements.define('app-header', Header);
