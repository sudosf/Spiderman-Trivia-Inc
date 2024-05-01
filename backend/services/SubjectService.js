const Subject = require('../models/Subject');

class SubjectService {
    async getAllSubjects() {
        return await Subject.findAll();
    }
}

module.exports = new SubjectService();
