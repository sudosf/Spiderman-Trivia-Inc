document.addEventListener('click', (event) => {
    if (
        event.target.tagName.toLowerCase() === 'a' &&
        event.target.href.includes('logout')
    ) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.setItem('signedIn', JSON.stringify(false));

            messageElement.innerText = 'Successfully signed out.';
            window.location.replace('/'); // Redirect to the main page
        }
    }
});
