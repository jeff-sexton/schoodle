/* eslint-disable camelcase */
const db = require('./db');
const {getGuestsForEvent, editUser} = require('./userQueries');
const {formatVotes} = require('./helpers');

// Add vote
const addVote = ({time_id, user_id, vote}) => {
  return db.query(
    `
    INSERT INTO votes (time_id, user_id, vote)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,[time_id, user_id, vote])
    .then(res => res.rows[0]);
};


// Add votes
const addVotes = (votes) => {
  const votePromises = [];
  for (const vote of votes) {
    votePromises.push(addVote(vote));
  }

  return Promise.all(votePromises);
};

// Update vote
const editVote = ({vote, id, time_id, user_id}) => {
  return db.query(
    `
    UPDATE votes
    SET vote = $1
    WHERE id = $2
    AND time_id = $3
    AND user_id = $4
    RETURNING *;
    `,[vote, id, time_id, user_id])
    .then(res => res.rows[0]);
};

// Update Votes
const editVotes = (votes) => {
  const votePromises = [];
  for (const vote of votes) {
    votePromises.push(editVote(vote));
  }

  return Promise.all(votePromises);
};


const processVotes = (formData, user) => {
  const {newVotes, updateVotes} = formatVotes(formData, user);

  console.log('\n****Formatted newVotes',newVotes, '\n');
  console.log('\n****Formatted updateVotes',updateVotes, '\n');

  const newVotesPromise = addVotes(newVotes);

  const updateVotesPromise = editVotes(updateVotes);

  return Promise.all([newVotesPromise, updateVotesPromise])
    .then(([newVotes, updatedVotes]) => {
      return updatedVotes.concat(newVotes);
    });
};

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

  const userPromise = editUser(userForm, user);

  const votesPromise = processVotes(formData, user);


  Promise.all([userPromise, votesPromise]).then(values => {
       console.log('\n***PromiseAll Votes\n',values, '\n');

  });

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
