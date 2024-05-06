import { Links } from "./constants";
class APICall{

    constructor(){
        this.authToken = localStorage.getItem('authToken');
        this.headers = new Headers({
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json',
        });
    }
    
    makeGetRequest(path) {

        const options = {
            method: 'GET',
            headers: this.headers,
        };

        return new Promise((resolve, reject) => {
            fetch(Links.serverBaseURL+`/${path}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    makePostRequest(path, body) {
        const options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
        };

        return new Promise((resolve, reject) => {
            fetch(Links.serverBaseURL + `/${path}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default APICall;