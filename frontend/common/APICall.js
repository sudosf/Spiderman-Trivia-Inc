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
            console.log(`GET : ${Links.serverBaseURL}/${path}`)
            console.log(options);
            fetch(`${Links.serverBaseURL}/${path}`, options)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.setItem('signedIn', "false");
                        window.location.replace('index.html');
                    } else if (response.status === 404) {
                        window.location.replace('404.html');
                    }
                }
                return response.json();
            })
            .then(data => {
                if (data?.message) {
                    reject(new Error(data?.message));
                  } else {
                    resolve(data);
                  }
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
                    if (response.status === 401) {
                        localStorage.setItem('signedIn', "false");
                        window.location.replace('index.html');
                    } else if (response.status === 404) {
                        window.location.replace('404.html');
                    }
                }
                return response.json();
            })
            .then(data => {
                if (data?.message) {
                    reject(new Error(data?.message));
                  } else {
                    resolve(data);
                  }
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default APICall;