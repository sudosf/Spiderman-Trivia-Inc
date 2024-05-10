import { Icons, Links, User } from '../common/constants.js';

class Header extends HTMLElement {
    connectedCallback() {
        const links = User.signedIn
            ? ` <a href="leaderboard">
                        <img class="icon clickable-spider" src=${Icons.leaderboard} alt="theme-toggler" />
                        Leaderboard
                    </a>
                    <a href="attempts">
                        <img class="icon clickable-spider" src=${Icons.tracking} alt="theme-toggler" />
                        My attempts
                    </a>
                    <a href="logout">
                        <img class="icon clickable-spider" src=${Icons.signOut} alt="theme-toggler" />
                        Sign out
                    </a>`
            : `<a href="${Links.serverBaseURL}/auth/github">
                        <img class="icon clickable-spider" src=${Icons.signIn} alt="theme-toggler" />
                        Sign In
                    </a>
                   `;

        this.innerHTML = `
            <header>
                <a class="clickable" href="/">
                    <img class="logo" src=${Icons.logo} alt="logo" />
                </a>

                <div class="dropdown clickable">
                    <img src=${User.profilePictureUrl} alt="Avatar" class="avatar">
                    <div class="dropdown-content">
                        <h6 class="dropdown-name">Hello, ${User.username}</h6>
                        <div class="dropdown-links">
                            <a href="/">
                                <img class="icon clickable-spider" src=${Icons.home} alt="theme-toggler" />
                                Home
                            </a>
                            <button id="theme-toggle-btn"> 
                                    <img class="sun clickable-spider" src=${Icons.sun} alt="theme-toggler" />
                                    <img class="moon clickable-spider" src=${Icons.moon} alt="theme-toggler" />
                                    <span>Color Theme</span>
                            </button>
                            ${links}
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('app-header', Header);
