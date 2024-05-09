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
});

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