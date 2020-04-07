/* eslint-disable camelcase */
const db = require('./db');

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
