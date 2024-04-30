var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.status(201).json({ message: 'Hello Spider!!' });;
});

module.exports = router;
