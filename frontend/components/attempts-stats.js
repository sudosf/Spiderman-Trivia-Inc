import { Images } from '../common/constants.js';
import APICall from '../common/APICall.js';

class AttemptsStats extends HTMLElement {
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
                    const scores = res.data.map(attempt => Number(attempt.score));
                    const highestScore = Math.max(...scores);
                    const lowestScore = Math.min(...scores);
                    const averageScore = (scores.reduce((acc, score) => acc + score, 0) / scores.length).toFixed(2);
                    const totalAttempts = res.data.length;
                                        this.innerHTML = `
                    <div class="cards">
                    <div class="card">
                        <p>Highest score</p>
                        <h2>${highestScore}</h2>
                    </div>
                    <div class="card">
                        <p>Lowest score</p>
                        <h2>${lowestScore}</h2>
                    </div>
                    <div class="card">
                        <p>Average score</p>
                        <h2>${averageScore}</h2>
                    </div>
                    <div class="card">
                        <p>Total attempts</p>
                        <h2>${totalAttempts}</h2>
                    </div>
                </div>
                    `;
                }else{
                    this.innerHTML = `<section><p>Well stats are shown here, you would see that if you have some attempts.</p></section>`;
                }
            }).catch(error=>{
                console.error('Failed to fetch your attempts stats:', error);
                this.innerHTML = `<section><p>Error loading your attempts stats.</p></section>`;
            })
    }
}

customElements.define('attempts-stats', AttemptsStats);
