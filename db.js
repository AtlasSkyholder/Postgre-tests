require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

const createUser = (name, email) => {

  return pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`, [name, email]);
}

const getUsers = function() {
  return pool.query(`
  SELECT * FROM users`).then(res => {
    return res.rows
  });
}

const findUsers = function(name) {
  return pool.query(`SELECT email FROM users WHERE name = $1`,[name]).then(res => {return res.rows[0]});
}

const updateUsers = function(name, email) {

  return pool.query(`UPDATE users SET email = $2 WHERE name = $1`,[name, email]);
}

const deleteUsers = function(name) {

  return pool.query(`DELETE FROM users WHERE name = $1`,[name]);
}

module.exports = {createUser, getUsers, findUsers, updateUsers, deleteUsers};