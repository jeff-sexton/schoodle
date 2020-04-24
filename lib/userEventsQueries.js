const db = require('./db');

// Get all user created events
const getMyEvents = (id) => {
  return db.query(`
  SELECT title, description, url,
    (SELECT COUNT( DISTINCT user_id )
    FROM votes
    JOIN times on times.id = time_id
    JOIN events on events.id = event_id
    WHERE event_id = e.id) as attendies
  FROM events e
  WHERE owner_id = $1;`, [id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getMyEvents = getMyEvents;

// get all user voted on events
const getMyVotedOnEvents = (id) => {
  return db.query(`
  SELECT title, description, url,
    (SELECT COUNT( DISTINCT user_id )
    FROM votes
    JOIN times on times.id = time_id
    JOIN events on events.id = event_id
    WHERE event_id = e.id) as attendies
  FROM events e
  JOIN times on event_id = events.id
  JOIN votes on times.id = time_id
  WHERE user_id = $1 AND owner_id != $1
  GROUP BY events.id;`, [id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getMyVotedOnEvents = getMyVotedOnEvents;
