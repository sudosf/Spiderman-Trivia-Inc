import { escapeHTML, getFromLocalStorage } from './utils.js';

export const Links = {
    serverBaseURL:
        'http://spiderman-trivia-api.eu-west-1.elasticbeanstalk.com/api',
    SourceCode: 'https://github.com/Spiderman-Trivia-Inc/Spiderman-Trivia-Inc',
};

export const Icons = {
    home: 'assets/icons/home.svg',
    logo: 'assets/icons/logo.svg',
    github: 'assets/icons/github.svg',
    moon: 'assets/icons/moon.svg',
    sun: 'assets/icons/sun.svg',
    check: 'assets/icons/check.svg',
    cancel: 'assets/icons/X.svg',
    signIn: 'assets/icons/signIn.svg',
    signOut: 'assets/icons/signOut.svg',
    leaderboard: 'assets/icons/leaderboard.svg',
    tracking: 'assets/icons/tracking.svg',
    external: 'assets/icons/external.svg',
};

export const Images = {
    loading: 'assets/images/loading.gif',
};

const rawUsername = getFromLocalStorage('username') || 'there';

const username = escapeHTML(rawUsername);

const authToken = getFromLocalStorage('authToken');
const signedIn = getFromLocalStorage('signedIn') || false;

const profilePictureUrl =
    username === 'there'
        ? 'assets/images/default-avatar.jpeg'
        : `https://github.com/${username}.png`;

export const User = {
    username,
    authToken,
    signedIn,
    profilePictureUrl,
};

export const Scripts = ['js/questions.js', 'js/signout.js', 'js/callback.js'];
