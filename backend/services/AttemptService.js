const Attempt = require('../models/Attempt');
const User = require('../models/User');
const Subject = require('../models/Subject');
const { NotFoundError,InvalidOperationError, BadRequestError } = require('../utils/errors');

class AttemptService {
    async createAttempt(attemptData) {
        await this.validateAttemptData(attemptData);
        return await Attempt.create(attemptData);
    }

    async getAllAttempts() {
        return await Attempt.findAll();
    }

    async getAttemptsByUserId(userId) {
        return await Attempt.findAll({
            where: { user_id: userId }
        });
    }
    
    async validateAttemptData(attemptData) {
        const userId = attemptData.user_id;
        const subjectId = attemptData.subject_id;
        const userExists = await User.findByPk(userId);
        const subjectExists = await Subject.findByPk(subjectId);

        if (!userExists) {
            throw new NotFoundError(`User with ID ${userId} not found`);
        }
        if (!subjectExists) {
            throw new NotFoundError(`Subject with ID ${subjectId} not found`);
        }
        if(!attemptData.score){
            throw new BadRequestError("score cannot be undefined");
        }
        if(attemptData.score < 0 || attemptData.score > 10){
            throw new InvalidOperationError("score cannot be lower than zero or higher than 10");
        }
    }
}

module.exports = new AttemptService();
