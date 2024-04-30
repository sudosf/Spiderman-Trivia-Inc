const User = require('../models/User');


exports.registerUser = async (req, res) => {
  try {


    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {

    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

exports.getUser = async (req, res) => {
  try {

    res.status(200).json({name:"spider"});
  } catch (error) {

    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
};