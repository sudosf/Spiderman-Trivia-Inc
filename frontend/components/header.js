import { Icons, Links, User } from '../common/constants.js';

class Header extends HTMLElement {
    connectedCallback() {
        const links =
            User.signedIn === 'true'
                ? ` <a href="leaderboard.html">
                        <img class="icon" src=${Icons.leaderboard} alt="theme-toggler" />
                        Leaderboard
                    </a>
                    <a href="attempts">
                        <img class="icon" src=${Icons.tracking} alt="theme-toggler" />
                        My attempts
                    </a>
                    <a href="logout">
                        <img class="icon" src=${Icons.signOut} alt="theme-toggler" />
                        Sign out
                    </a>`
                : `<a href="${Links.serverBaseURL}/auth/github">
                        <img class="icon" src=${Icons.signIn} alt="theme-toggler" />
                        Sign In
                    </a>
                   `;

        this.innerHTML = `
            <header>
                <a class="clickable" href="index.html">
                    <img class="logo" src=${Icons.logo} alt="logo" />
                </a>

                <div class="dropdown clickable">
                    <img src=${User.profilePictureUrl} alt="Avatar" class="avatar">
                    <div class="dropdown-content">
                        <h6 class="dropdown-name">Hello, ${User.username}</h6>
                        <div class="dropdown-links">
                            <a href="index">
                                <img class="icon" src=${Icons.home} alt="theme-toggler" />
                                Home
                            </a>
                            <a id="theme-toggle-btn"> 
                                    <img class="sun" src=${Icons.sun} alt="theme-toggler" />
                                    <img class="moon" src=${Icons.moon} alt="theme-toggler" />
                                    <span>Color Theme</span>
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
