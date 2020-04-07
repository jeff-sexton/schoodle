/* eslint-disable camelcase */
const db = require('./db');
const {getGuestsForEvent} = require('./userQueries');

// create user vote


// Update user vote



// Get votes for a specific user and event - package result with user object for rendering on client
const getVotesPerUserForEvent = (event_id, user) => {
  return db.query(`
  SELECT votes.id,
  votes.user_id,
  votes.vote,
  votes.time_id,
  times.event_id,
  times.start_time,
  times.end_time
  FROM votes
  JOIN times ON time_id = times.id
  WHERE times.event_id = $1
  AND user_id = $2
  ORDER BY start_time;
  `, [event_id, user.id])
    .then(votes => {
      const userVotes = votes.rows;
      return {user, userVotes};
    });
};

module.exports.getVotesPerUserForEvent = getVotesPerUserForEvent;

// get an array of user objects and associated votes for a specific event - exclude current user (collected individually)
const getGuestVotesForEvent = (event_id, currentUser) => {

  return getGuestsForEvent(event_id, currentUser)
    .then((users) => {
      const promiseArray = [];
      for (const user of users) {
        promiseArray.push(getVotesPerUserForEvent(event_id, user));
      }
      return Promise.all(promiseArray);
    });
};

module.exports.getGuestVotesForEvent = getGuestVotesForEvent;
