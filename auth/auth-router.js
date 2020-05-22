const router = require('express').Router();

const db = require('../database/db-helper');
const jwt = require('jsonwebtoken');

const {
  validateLogin,
  validateNewUser
} = require('./authenticate-middleware')

router.post('/register', validateNewUser, (req, res) => {
  const { user } = req;
  const token = generateToken(user);

  return db.addUser(req.user)
    .then(resp => res.status(201).json({
      message: `${user.username} created successfully.`,
      user,
      token
    }))
    .catch(error => res.status(500).json(error.message));
});

router.post('/login', validateLogin, (req, res) => {
  const { user } = req;
  const token = generateToken(user);
  return res.status(200).json({
    message: `Welcome back, ${user.username}!`,
    token,
  });
});

const generateToken = user => {
  const payload = {
      subject: user.id,
      username: user.username,
  };

  const options = {
      expiresIn: '1d',
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
