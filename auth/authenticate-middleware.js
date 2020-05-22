/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const db = require('../database/db-helper');
const bc = require('bcryptjs')

const validateNewUser = async (req, res, next) => {
  const { body } = req;
  if (!body) return res.status(400).json({ message: 'Body was not provided in the request.' });

  let {
      username, password
  } = body;

  // Ensure that username and password are provided.
  if (!username || !password) return fail(res, 'Username and password must be provided.');

  // Check if username is already in use.
  const nameExists = await db.getUserByUsername(username);
  if (nameExists) return fail(res, 'Username is already taken.');

  // Encypt password.
  req.body.password = await bc.hashSync(password, 10);

  req.user = req.body;
  next();
}

const validateLogin = async (req, res, next) => {
  // Allow users to login via username or e-mail.
  const { body } = req;
  if (!body) return res.status(400).json({ message: 'Body was not provided in the request.' });

  const {
      username, password
  } = body;

  if (!username || !password) return fail(res, 'Please a username and password.');

  let user = await db.getUserByUsername(username);

  // Test whether user exists.
  if (!user) return fail(res, 'Invalid credentials.');

  // Test whether password matches.
  if (!tryPassword(password, user.password)) return fail(res, 'Invalid credentials.');
  
  req.user = user;
  next();
}

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return fail(res, 'Client must provide authorization information.');

  jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
    if (err) return fail(res, 'Client provided invalid authorization information.')
    else {
      req.jwt = token;
      next();
    }
  })
}

const fail = (res, message) => res.status(400).json({ message });
const tryPassword = async (password, hash) => await bc.compareSync(password, hash);

module.exports = {
  validateLogin,
  validateNewUser,
  authenticate
}
