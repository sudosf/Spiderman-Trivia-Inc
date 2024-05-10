import {
    saveToLocalStorage,
    getFromLocalStorage,
    isLocalStorageItemPresent,
} from '../common/utils.js';

document.addEventListener('DOMContentLoaded', function () {
    let isDarkMode = isDarkModePreferred();

    if (isLocalStorageItemPresent('isDarkMode')) {
        isDarkMode = getFromLocalStorage('isDarkMode');
    }

    toggleDarkMode(isDarkMode);

    // handle back navigation
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href);
    };
});

// Warn users leaving the current page
window.onbeforeunload = function () {
    return 'Your work will be lost.';
};

const rootElement = document.querySelector(':root');
const modeToggleBtn = document.getElementById('theme-toggle-btn');

modeToggleBtn.addEventListener('click', () => {
    rootElement.classList.toggle('dark-mode');

    const isCurrentDarkMode = getFromLocalStorage('isDarkMode');

    saveToLocalStorage('isDarkMode', !isCurrentDarkMode);
});

// Check if dark mode is preferred by the user
function isDarkModePreferred() {
    return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
}

function toggleDarkMode(isDarkMode) {
    if (isDarkMode) {
        rootElement.classList.add('dark-mode');
    } else {
        rootElement.classList.remove('dark-mode');
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service_worker.js')
        .then((registration) => {
            console.log('SW Registered!');
        })
        .catch((error) => {
            console.log('SW Registration Failed');
        });
} else {
    console.log('Not supported');
}
