const rootElement = document.documentElement;

const modeToggleBtn = document.getElementById('mode-toggle-btn');

modeToggleBtn.addEventListener('click', () => {
    rootElement.classList.toggle('dark-mode');
});
