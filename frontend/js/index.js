const rootElement = document.querySelector(':root');
const modeToggleBtn = document.getElementById('theme-toggle-btn');

modeToggleBtn.addEventListener('click', () => {
    rootElement.classList.toggle('dark-mode');
});