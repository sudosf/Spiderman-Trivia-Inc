import { Links, Images } from '../common/constants.js';

class Subjects extends HTMLElement {
    async connectedCallback() {
        // loading state
        this.innerHTML = `
            <section class="subjects-container">
                <img src=${Images.loading} alt="Loading..." class="loading-indicator" />
            </section>
        `;

        const authToken = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${Links.serverBaseURL}/subjects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const data = await response.json();
            if (data.status === "success" && data.data.length > 0) {
                const subjectsHtml = data.data.map(subject => `
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
            } else if(data.status === "UnauthorizedError"){
                localStorage.setItem('signedIn',"false");
                window.location.replace('index.html'); // Redirect to the main page
            }
            else{
                this.innerHTML = `<section class="subjects-container">No subjects available.</section>`;
            }
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
            this.innerHTML = `<section class="subjects-container">Error loading subjects.</section>`;
        }
    }
}

customElements.define('subjects-component', Subjects);
