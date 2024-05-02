class Button extends HTMLElement{
    connectedCallback(){
        const iconUrl = this.getAttribute('icon');
        const option = this.getAttribute('option');
        const submitBtn = this.getAttribute('isSubmit')?"btn-submit":"";
        const isCorrectAttribute = this.getAttribute("isCorrect");
        let icon2Url;
        
        if (isCorrectAttribute == "true") {
          icon2Url = "../assets/icons/check.svg";
        } else if (isCorrectAttribute == "false") {
          icon2Url = "../assets/icons/X.svg";
        }else {
            icon2Url = undefined;
          }
        

        const rightIconHTML = icon2Url ? `<img class="btn-right" src="${icon2Url}"/>` : '';
        this.innerHTML=`
        <button class="btn-options ${submitBtn}">
            <aside class="btn-left">
                <img src="${iconUrl}" alt="Icon"/>
                <p>${option}</p>
            </aside>
            ${rightIconHTML}
        </button>
        `
    }
}

customElements.define("options-btn",Button);