import { Images } from '../common/constants.js';
import APICall from '../common/APICall.js';

class Attempts extends HTMLElement {
    async connectedCallback() {
        // loading state
        this.innerHTML = `
            <section>
                <img src=${Images.loading} alt="Loading..." class="loading-indicator" />
            </section>
        `;

        var _apiCall = new APICall();
        
        _apiCall.makeGetRequest('attempts/me')
            .then(res=>{
                
                if (res.data.length > 0) {
                    const attemptsHtml = res.data.map(({timestamp,score,subjects}) => `
                        <tr>
                            <td>${subjects.name}</td>
                            <td>${score}</td>
                            <td>${new Date(timestamp).toLocaleString('en-US', { day: 'numeric', year: 'numeric', month: 'numeric',  hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                    `).join('');
    
                    this.innerHTML = `
                    <table class="attempts-table">
                        <tr>
                            <th>subject</th>
                            <th>score</th>
                            <th>timestamp</th>
                        </tr>
                        ${attemptsHtml}
                    </table>
                    `;
                }else{
                    this.innerHTML = `<section><p>No attempts available. Go and play and come back here.</p></section>`;
                }
            }).catch(error=>{
                console.error('Failed to fetch your attempts:', error);
                this.innerHTML = `<section><p>Error loading your attempts.</p></section>`;
            })
    }
}

customElements.define('attempts-table', Attempts);
