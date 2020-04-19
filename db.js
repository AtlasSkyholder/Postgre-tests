require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

const createUser = (request, response) => {
  const {email , name} = request.body;

  return pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`, [name, email]);
}

const getUsers = function() {
  return pool.query(`
  SELECT * FROM users`).then(res => {
    return res.rows
  });
}

module.exports = {createUser, getUsers};