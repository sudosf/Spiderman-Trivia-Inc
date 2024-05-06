import { Icons } from '../common/constants.js';

class Button extends HTMLElement {
    connectedCallback() {
        const iconUrl = this.getAttribute('icon');
        const option = this.getAttribute('option');
        const isCorrectAttribute = Boolean(this.getAttribute('isCorrect'));

        const submitBtn = this.getAttribute('isSubmit') ? 'btn-submit' : '';

        let icon2Url;

        if (isCorrectAttribute) {
            icon2Url = Icons.check;
        } else if (!isCorrectAttribute) {
            icon2Url = Icons.cancel;
        } else {
            icon2Url = undefined;
        }

        const rightIconHTML = icon2Url
            ? `<img class="btn-right" src="${icon2Url}"/>`
            : '';

        this.innerHTML = `
        <button class="btn-options ${submitBtn}">
            <aside class="btn-left">
                ${leftIconHTML}
                <p></p>
            </aside>
        </button>
        `;
    }
}

customElements.define('options-btn', Button);
