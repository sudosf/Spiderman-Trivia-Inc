import { removeFromLocalStorage, saveToLocalStorage } from '../common/utils.js';

document.addEventListener('click', (event) => {
    if (
        event.target.tagName.toLowerCase() === 'a' &&
        event.target.href.includes('logout')
    ) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            removeFromLocalStorage('authToken');
            removeFromLocalStorage('username');
            saveToLocalStorage('signedIn', false);

            messageElement.innerText = 'Successfully signed out.';
            window.location.replace('/'); // Redirect to the main page
        }
    }
});
