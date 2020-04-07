/* eslint-disable camelcase */
const db = require('./db');

// Get times for an event alone with any vote (true) totals if any
const getTimesForEvent = (id) => {
  return db.query(`
  SELECT times.id,
  event_id,
  start_time,
  end_time,
  totals.total_votes
  FROM times
  LEFT JOIN (
    SELECT times.id as id,
    count(votes.vote) as total_votes
    FROM times
    JOIN votes ON time_id = times.id
    GROUP BY times.id, votes.vote
    HAVING votes.vote IS true
  ) as totals ON times.id = totals.id
  WHERE event_id = $1
  GROUP BY times.id, totals.total_votes
  ORDER BY start_time;
  `, [id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getTimesForEvent = getTimesForEvent;

// Add time entry
const addTime = ({event_id, start_time, end_time}) => {
  return db.query(`
  INSERT INTO times (event_id, start_time, end_time)
  VALUES($1, $2, $3)
  RETURNING *;
  `, [event_id, start_time, end_time])
    .then(res => {
      return res.rows[0];
    });
};

// Add an array of time entries to db - called by create event
const addTimes = (newTimes) => {
  const timesPromises = [];

  for (const newTime of newTimes) {
    timesPromises.push(addTime(newTime));
  }

  return Promise.all(timesPromises)
    .then(times => {
      return times;
    });
};

module.exports.addTimes = addTimes;
