/* eslint-disable camelcase */
const db = require('./db');
const {generateRandomUrl, formatTimes} = require('./helpers');
const {editUser} = require('./userQueries');
const {addTimes} = require('./timeQueries');

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

// Sequence the creation of a new event. Also updates user (if necessary) and adds times for the event
const createEventFromForm = (formData, user) => {

  // Update User details
  const userForm = {
    id: user.id,
    name: formData.name,
    email: formData.email
  };

  const userPromise = editUser(userForm, user);

  // Create Event
  const newEvent = {
    title: formData.title,
    description: formData.description,
    owner_id: user.id
  };

  const eventPromise = addEvent(newEvent)
    .then((event) => {

      const formTimes = {
        event_id: event.id,
        start_dates: formData.start_dates,
        start_times: formData.start_times,
        end_dates: formData.end_dates,
        end_times: formData.end_times,
        offset: formData.offset
      };

      // Construct db entity compliant Times from formData
      const newTimes = formatTimes(formTimes);

      // Add times to db
      return addTimes(newTimes)
        .then((times)=>{
          return {event, times};
        });
    });

  // Wait for all async promises to complete and then return db data to client
  return Promise.all([userPromise, eventPromise])
    .then(([user, {event, times}]) => {
      return {user, event, times};
    });
};

module.exports.createEventFromForm = createEventFromForm;

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
  SELECT times.id,
  event_id,
  start_time,
  end_time,
  count(votes.vote = 'true') as total_votes
  FROM times
  JOIN votes ON time_id = times.id
  WHERE event_id = $1
  GROUP BY times.id, votes.vote
  HAVING votes.vote IS true
  ORDER BY start_time;
  `, [id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getTimesForEvent = getTimesForEvent;


// Get votes for an event

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

          // add following after instert into votes created:  if votes.rows.length === 0 => insert votes and recall else return results
      const userVotes = votes.rows;
      return {user, userVotes};
    });
};

const getGuestsForEvent = (event_id, ownerUser) => {
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
  `, [event_id, ownerUser.id])
    .then(res => {
      return res.rows;
    });
};

const getGuestVotesForEvent = (event_id, ownerUser) => {

  return getGuestsForEvent(event_id, ownerUser)
    .then((users) => {
      const promiseArray = [];
      for (const user of users) {
        promiseArray.push(getVotesPerUserForEvent(event_id, user));
      }
      return Promise.all(promiseArray);
    });
};

module.exports.getGuestVotesForEvent = getGuestVotesForEvent;

// Sequence getting all data related to an event
const getDataForEvent = (event, ownerUser) => {

  const timesPromise = getTimesForEvent(event.id);

  const userVotesPromise = getVotesPerUserForEvent(event.id, ownerUser);

  const guestsVotesPromise = getGuestVotesForEvent(event.id, ownerUser);

  // Wait for all async promises to resolve and return data to the client
  return Promise.all([timesPromise, userVotesPromise, guestsVotesPromise])
    .then(([times, userVotes, guestVotes]) => {

      return {
        user: ownerUser,
        userVotes,
        event,
        times,
        guests: guestVotes
      };
    });
};

module.exports.getDataForEvent = getDataForEvent;

