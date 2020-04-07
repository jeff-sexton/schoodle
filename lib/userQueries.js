const db = require('./db');

// Get all Users

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

//Get one user by id
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

// Edit user - add name and email or change them

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








