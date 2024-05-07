import { Links } from "./constants.js";
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
            fetch(`${Links.serverBaseURL}/${path}`, options)
            .then(response => {
                if (!response.ok) {
                    if(response.status === 401){
                        localStorage.setItem('signedIn', "false");
                        window.location.replace('index.html');
                    } else if(response.status === 404){
                        console.error('Not found!!');
                    } else {
                        reject(new Error('Network response was not ok'));
                    }
                    return;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
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
            fetch(`${Links.serverBaseURL}/${path}`, options)
            .then(response => {
                if (!response.ok) {
                    if(response.status === 401){
                        localStorage.setItem('signedIn', "false");
                        window.location.replace('index.html');
                    } else if(response.status === 404){
                        throw new Error('Not found!!');//should redirect to 404 page
                    } else {
                        throw new Error('Network response was not ok');
                    }
                    return;
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