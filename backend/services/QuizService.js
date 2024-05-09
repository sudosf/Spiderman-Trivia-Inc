const { Sequelize } = require('sequelize');
const Question = require('../models/Question');
const Subject = require('../models/Subject');
const { NotFoundError } = require('../utils/errors');

class QuizService {
    async startQuiz(subjectId) {
        // validate subject before starting the quiz
        await this.validateData(subjectId);

        // Retrieve 10 random questions for the specified subject
        const questions = await Question.findAll({
            where: { subject_id: subjectId },
            order: Sequelize.literal('random()'),
            limit: 10
        });

        if (!questions || questions.length === 0) {
            throw new NotFoundError("No questions found for the specified subject");
        }
        return questions.map(question => ({
            question_id: question.question_id,
            question: question.question,
            options: question.options,
            answer: question.answer 
        }));
    }
    
    async validateData(subjectId) {
        const subjectExists = await Subject.findByPk(subjectId);
        if (!subjectExists) {
            throw new NotFoundError(`Subject with ID ${subjectId} not found`);
        }
    }
}

module.exports = new QuizService();
