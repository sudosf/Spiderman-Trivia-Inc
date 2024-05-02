class Footer extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`
        <section class="footer container">
            <p>
            &copy;
                ${new Date().getFullYear()}
            SpiderMan Trivia Inc.
            </p>
    
            <img src="assets/icons/github.svg" alt="">
        </section>
        `
    }
}

customElements.define("app-footer",Footer);