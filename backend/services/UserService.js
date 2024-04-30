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
}

module.exports = new UserService();
