/* eslint-disable camelcase */
const db = require('./db');
const {generateRandomUrl, formatTimes} = require('./helpers');
const {editUser} = require('./userQueries');
const {addTimes, getTimesForEvent} = require('./timeQueries');
const {getVotesPerUserForEvent, getGuestVotesForEvent} = require('./voteQueries');

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

// Sequence getting all data related to an event
const getDataForEvent = (event, currentUser) => {

  const timesPromise = getTimesForEvent(event.id);

  const userVotesPromise = getVotesPerUserForEvent(event.id, currentUser);

  const guestsVotesPromise = getGuestVotesForEvent(event.id, currentUser);

  // Wait for all async promises to resolve and return data to the client
  return Promise.all([timesPromise, userVotesPromise, guestsVotesPromise])
    .then(([times, userVotes, guestVotes]) => {

      return {
        user: currentUser,
        userVotes,
        event,
        times,
        guests: guestVotes
      };
    });
};

module.exports.getDataForEvent = getDataForEvent;


// Add new event
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
