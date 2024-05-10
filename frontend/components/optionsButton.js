class Button extends HTMLElement {
    connectedCallback() {
        const iconUrl = this.getAttribute('icon');

        const submitBtn = this.getAttribute('isSubmit') ? 'btn-submit' : '';
        const leftIconHTML = this.getAttribute('isSubmit')
            ? `<img src="${iconUrl}" alt="Icon"/>`
            : `<p class="options-num">${iconUrl}</p>`;

        this.innerHTML = `
        <button class="btn-options clickable-spider ${submitBtn}">
            <aside class="btn-left">
                ${leftIconHTML}
                <p></p>
            </aside>
        </button>
        `;
    }
}

customElements.define('options-btn', Button);
