import { saveToLocalStorage } from '../common/utils.js';

window.onload = function () {
    // Get the full fragment after '#'
    const tokenFragment = window.location.hash.slice(1); // removes the '#' character
    const params = new URLSearchParams(tokenFragment);

    const token = params.get('token');
    const username = params.get('username');
    if (params.size !== 0) {
        const messageElement = document.getElementById('message');

        if (token && username) {
            saveToLocalStorage('authToken', token);
            saveToLocalStorage('username', username);
            saveToLocalStorage('signedIn', true);
            messageElement.innerText =
                'Authentication successful. you can close this tab if you are not redirected to home.';

            window.location.hash = ''; // Clear the fragment
            window.location.replace('/'); // Redirect to the main page
        } else {
            messageElement.innerText = 'No token or username found.';
        }
    }
};
