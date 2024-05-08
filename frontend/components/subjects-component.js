import { Links, Images } from '../common/constants.js';
import APICall from '../common/APICall.js';

class Subjects extends HTMLElement {
    async connectedCallback() {
        // loading state
        this.innerHTML = `
            <section class="subjects-container">
                <img src=${Images.loading} alt="Loading..." class="loading-indicator" />
            </section>
        `;

        var _apiCall = new APICall();
        
        _apiCall.makeGetRequest('subjects')
            .then(res=>{
 
                if (res.data.length > 0) {
                    const subjectsHtml = res.data.map(subject => `
                        <subject-component 
                        name="${subject.name}"
                        image-url="${subject.image_url}"
                        subject-id="${subject.subject_id}">
                        </subject-component>
                    `).join('');
    
                    this.innerHTML = `
                        <section class="subjects-container">
                            ${subjectsHtml}
                        </section>
                    `;
                }else{
                    this.innerHTML = `<section class="subjects-container">No subjects available.</section>`;
                }
            }).catch(error=>{
                console.error('Failed to fetch subjects:', error);
                this.innerHTML = `<section class="subjects-container">Error loading subjects.</section>`;
            })
    }
}

customElements.define('subjects-component', Subjects);
