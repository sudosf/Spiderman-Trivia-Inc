const User = require('../models/User');
const { NotFoundError} = require('../utils/errors');

class UserService {
    async getUserById(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }
    async findOrCreateUser(githubData) {
        const user = await User.findOne({ where: { github_id: githubData.id.toString() } });
        if (user) {
            return user;
        } else {
            return await User.create({
                username: githubData.login,
                github_id: githubData.id.toString()
            });
        }
    }
}

module.exports = new UserService();
