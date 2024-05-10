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


const rootElement = document.querySelector(':root');
const modeToggleBtn = document.getElementById('theme-toggle-btn');
const usermenuAvatar = document.getElementById('usermenu-avatar');
const userMenu = document.getElementById('usermenu');

modeToggleBtn.addEventListener('click', () => {
    rootElement.classList.toggle('dark-mode');

    const isCurrentDarkMode = getFromLocalStorage('isDarkMode');

    saveToLocalStorage('isDarkMode', !isCurrentDarkMode);
});

usermenuAvatar.addEventListener('click',()=>{
    const isUserMenuHidden = userMenu.classList.contains('hide-menu');
    toggleUserMenu(isUserMenuHidden);
    
})

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
            console.log('Service Worker Registered!');
        })
        .catch((error) => {
            console.log('Service Worker Registration Failed');
        });
} else {
    console.log('Service Worker Not supported');
}


function toggleUserMenu(isUserMenuHidden) {
    if (isUserMenuHidden) {
        userMenu.classList.remove('hide-menu');
        userMenu.classList.add('show-menu');
    } else {
        userMenu.classList.remove('show-menu');
        userMenu.classList.add('hide-menu');
    }
}
