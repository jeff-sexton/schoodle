/* eslint-disable camelcase */
const db = require('./db');
const {generateRandomUrl} = require('./helpers');
// Create new event

const addEvent = (event) => {

  const newUrl = generateRandomUrl();

  return db.query(`
  INSERT INTO events (title, description, owner_id, url)
  VALUES($1, $2, $3, $4)
  RETURNING *;
  `, [event.title, event.description, event.owner_id, newUrl])
    .then(res => {
      return res.rows[0];
    });

};

module.exports.addEvent = addEvent;

// Get event by url

const getEventByUrl = (url) => {
  return db.query(`
  SELECT *
  FROM events
  WHERE url = $1;
  `, [url])
    .then(res => {
      return res.rows[0];
    });
};

module.exports.getEventByUrl = getEventByUrl;

// Get times for an event
const getTimesForEvent = (id) => {
  return db.query(`
  SELECT *
  FROM times
  WHERE event_id = $1
  ORDER BY start_time;
  `, [id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getTimesForEvent = getTimesForEvent;


// Get votes for an event

const getVotesPerUserForEvent = (event_id, user_id) => {
  return db.query(`
  SELECT *
  FROM votes
  JOIN times ON time_id = times.id
  WHERE times.event_id = $1
  AND user_id = $2;
  `, [event_id, user_id])
    .then(res => {
      const userVotes = res.rows;
      return {user_id, userVotes};
    });
};


const getUsersForEvent = (event_id) => {
  return db.query(`
  SELECT user_id
  FROM votes
  JOIN times ON time_id = times.id
  WHERE times.event_id = $1
  GROUP BY user_id;
  `, [event_id])
    .then(res => {
      return res.rows;
    });
};

const getVotesForEvent = (event_id) => {
  return getUsersForEvent(event_id)
    .then((users) => {
      const promiseArray = [];
      for (const user of users) {
        promiseArray.push(getVotesPerUserForEvent(event_id, user.user_id));
      }
      return Promise.all(promiseArray);
    });
};

module.exports.getVotesForEvent = getVotesForEvent;



