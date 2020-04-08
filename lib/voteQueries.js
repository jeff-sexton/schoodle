/* eslint-disable camelcase */
const db = require('./db');
const {getGuestsForEvent, editUser} = require('./userQueries');

// create user vote


// Update user vote



// Sequence the creation or update of votes - also updates user details if necessary

const processVotesForm = (formData, user) => {

  console.log('\n*****VoteFormData\n', formData, '\n');
  console.log('\n*****VoteFormUser\n', user, '\n');

  // Update User details (if necessary)
  const userForm = {
    id: user.id,
    name: formData.name,
    email: formData.email
  };

  // const userPromise = editUser(userForm, user);

  // check for new votes
  const newVotes = [];
  const updateVotes = [];
  for (const key in formData) {
    console.log(key, typeof key);
    if(key.includes('vote')) {
      const keyParts = key.split('-');
      console.log(keyParts);
      const vote = {};
      for (let i = 0; i < keyParts.length; i++) {
        if (keyParts[i] === 'id' && !isNaN(keyParts[i + 1]) || keyParts[i] === 'time_id') {
          vote[keyParts[i]] = Number(keyParts[i + 1]);
        }
      }

      if (formData[key] === 'true') {
        vote.vote = true;

      } else if (formData[key] === 'false') {
        vote.vote = false;

      } else {
        vote.vote = null;
      }

      console.log(vote);

      if (Object.hasOwnProperty.call(vote, 'id')) {
        updateVotes.push(vote);
      } else {
        newVotes.push(vote);
      }
    }
  }

  console.log(newVotes);
  console.log(updateVotes);


  // create new votes


  // update existing votes

  // Promise.all().then() - response

};

module.exports.processVotesForm = processVotesForm;

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
