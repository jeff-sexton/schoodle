
const db = require('./db');

// Add new user with empty fields - return new user_id for session

const addUser = () => {
  return db.query('INSERT INTO users (name, email) VALUES (null, null) RETURNING *;')
    .then(res => {
      return res.rows[0];
    });
};

module.exports.addUser = addUser;

// Get all Users

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(res => {
      return res.rows;
    });
};

module.exports.getUsers = getUsers;

//Get one user by id

const getUser = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(res => {
      return res.rows[0];
    });
};

module.exports.getUser = getUser;


// Edit user - add name and email or change



// Create new event



// Create new time for an event



// Get event data with times and existing votes, calculated totals


// create user vote


// Update user vote




