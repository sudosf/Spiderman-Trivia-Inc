window.onload = function () {
        const messageElement = document.getElementById('message');
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.setItem('signedIn', "false");
        messageElement.innerText =
            'Successfully signed out.';
        window.location.replace('index.html'); // Redirect to the main page
    
};
