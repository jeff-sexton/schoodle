
const db = require('./db');

// Add new user - return new user_id for session

const addUser = () => {

};

module.exports.addUser = addUser;


const getUsers = () => {
  console.log('getuser');
  return db.query('SELECT * FROM users;')
    .then(res => {
      return res.rows;
    });
};

module.exports.getUsers = getUsers;



// Edit user - add name and email or change



// Create new event



// Create new time for an event



// Get event data with times and existing votes, calculated totals


// create user vote


// Update user vote




