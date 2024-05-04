const cors = require('cors');
const { sendError } = require('./responseHandler');
const { ForbiddenError } = require('../utils/errors');

const allowedOrigins = [
    'http://127.0.0.1:5500', 
    'https://spiderman-trivia-inc.github.io'
  ];

const customCors = (req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    cors({
      origin: origin,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'], 
      optionsSuccessStatus: 200
    })(req, res, next);
  } else {
    sendError(res,new ForbiddenError('CORS policy does not allow access from your origin.'))
  }
};

module.exports = customCors;
