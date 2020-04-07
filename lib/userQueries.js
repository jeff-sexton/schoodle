/* eslint-disable camelcase */
const db = require('./db');

   // Get all Users  -- this route can be removed?
const getUsers = () => {
  return db.query(`
  SELECT *
  FROM users;
  `)
    .then(res => {
      return res.rows;
    });
};

module.exports.getUsers = getUsers;

// Get one user by id
const getUser = (id) => {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, [id])
    .then(res => {
      return res.rows[0];
    });
};

module.exports.getUser = getUser;

// Return an array of guests for an event excluding the current user
const getGuestsForEvent = (event_id, currentUser) => {
  return db.query(`
  SELECT *
  FROM users
  WHERE id IN (
    SELECT user_id
    FROM votes
    JOIN times ON time_id = times.id
    WHERE times.event_id = $1
    AND user_id != $2
    GROUP BY user_id
  );
  `, [event_id, currentUser.id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getGuestsForEvent = getGuestsForEvent;

// Edit user - add name and email or update them if necessary
const editUser = (newUser, currentUser) => {

  if (currentUser.name !== newUser.name || currentUser.email !== newUser.email) {
    const params = [currentUser.id, newUser.name, newUser.email];

    return db.query(`
    UPDATE users
    SET (name, email) = ($2, $3)
    WHERE id = $1
    RETURNING *;
    `, params)
      .then(res => {
        return res.rows[0];
      });
  } else {
    return currentUser;
  }
};

module.exports.editUser = editUser;

// Add new user with empty fields - return new user_id for session
const addUser = () => {
  return db.query(`
  INSERT INTO users (name, email)
  VALUES (null, null)
  RETURNING *;
  `)
    .then(res => {
      return res.rows[0];
    });
};

module.exports.addUser = addUser;
