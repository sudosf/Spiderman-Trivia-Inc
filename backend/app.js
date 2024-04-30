const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const sequelize = require('./config/database');
const logger = require('./config/logger');

// routes
const usersRoutes = require('./routes/UserRoutes');
const subjectsRoutes = require('./routes/SubjectRoutes');
const attemptsRoutes = require('./routes/AttemptRoutes');
const quizRoutes = require('./routes/QuizRoutes');

const app = express();

app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) }}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/attempts', attemptsRoutes);
app.use('/api/quiz', quizRoutes);

sequelize.sync({ force: false }).then(() => {
    logger.info('Database connected and models synchronized');
}).catch(err => {
    logger.error(`Unable to connect to the database: ${err.message}`);
});

module.exports = app;
