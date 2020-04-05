const db = require('./db');

// Add time entry
const addTime = (time) => {
  return db.query(`
  INSERT INTO times (event_id, start_time, end_time)
  VALUES($1, $2. $3)
  RETURNING *;
  `, [time.event_id, time.start_time, time.end_time])
    .then(res => {
      return res.rows[0];
    });
};

module.exports.addTime = addTime;
