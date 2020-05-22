// * Knex Database (DBMS)
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config[process.env.ENV || 'development']);

module.exports = {
    // -> User Functions
    getAllUsers: () => db('users as u'),
    getUserByID: id => db('users as u').where({ id }).first(),
    getUserByUsername: username => db('users as u')
        .where({ username })
        .first(),
    addUser: user => db('users').insert(user),
    updateUser: (id, update) => db('users').where({ id }).update(update),
    removeUser: id => db('users').where({ id }).del(),
}