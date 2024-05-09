const { Sequelize, Op } = require('sequelize');
const Attempt = require('../models/Attempt');
const User = require('../models/User');

class LeaderboardService {
    async getLeaderboardBySubjectId(subjectId) {
            const leaderboardData = await Attempt.findAll({
                where: { subject_id: subjectId },
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('Attempt.score')), 'average_score'],
                    'user_id' 
                ],
                include: [{
                    model: User,
                    attributes: ['username'],
                    as: 'user'  // Matching the alias defined in the association
                }],
                group: ['Attempt.user_id', 'user.user_id'], // Correct the grouping
                order: [[Sequelize.fn('AVG', Sequelize.col('Attempt.score')), 'DESC']],
                raw: true
            });

            const formattedData = leaderboardData.map(data => ({
                username: data['user.username'],
                average_score: parseFloat(data.average_score).toFixed(2) // Format average score
            }));
            return formattedData;
    }
}

module.exports = new LeaderboardService();
