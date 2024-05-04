const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const sequelize = require('./config/database');
const logger = require('./config/logger');
const verifyToken = require('./middleware/jwtMiddleware');
const customCors = require('./middleware/customCorsMIddleware');

// routes
const usersRoutes = require('./routes/UserRoutes');
const subjectsRoutes = require('./routes/SubjectRoutes');
const attemptsRoutes = require('./routes/AttemptRoutes');
const quizRoutes = require('./routes/QuizRoutes');
const authRoutes = require('./routes/AuthRoutes');

const app = express();

app.use(customCors);
app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) }}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, usersRoutes);
app.use('/api/subjects', verifyToken, subjectsRoutes);
app.use('/api/attempts', verifyToken, attemptsRoutes);
app.use('/api/quiz', verifyToken, quizRoutes);

sequelize.sync({ force: false }).then(() => {
    logger.info('Database connected and models synchronized');
}).catch(err => {
    logger.error(`Unable to connect to the database: ${err.message}`);
});

module.exports = app;
