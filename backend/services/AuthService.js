const axios = require('axios');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const UserService = require('./UserService');

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET;
const scope = "read:user";

if(!client_id){
    logger.error("github client id not set");
}
if(!client_secret){
    logger.error("github client secret not set");
} 
if(!jwtSecret){
    logger.error("jwt secret not set");
} 
class AuthService {
    getGitHubAuthUrl() {
        const base = 'https://github.com/login/oauth/authorize';
        const params = `client_id=${client_id}&scope=${scope}`;
        return `${base}?${params}`;
    }

    async exchangeCodeForToken(code) {
        const url = 'https://github.com/login/oauth/access_token';
        const values = {
            client_id,
            client_secret,
            code
        };
        const response = await axios.post(url, values, {
            headers: { Accept: 'application/json' }
        });
        const accessToken = response.data.access_token;
        const githubUserData = await this.getGithubUserInfo(accessToken);
        const user = await UserService.findOrCreateUser(githubUserData);
        const jwtToken = this.generateJWT(user);
        return { access_token: jwtToken};
    }

    async getGithubUserInfo(accessToken) {
        const { data } = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${accessToken}` }
        });
        return data;
    }

    generateJWT(user) {
        const payload = {
            user_id:user.user_id
        };
        return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    }
}

module.exports = new AuthService();
