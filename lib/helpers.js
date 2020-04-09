/* eslint-disable camelcase */

// Generate url for new events
const generateRandomUrl = () => {
  const possibleCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  //uuid or guid -- research

  let stringLength = 10;
  let newString = '';
  for (let i = 0; i < stringLength; i++) {
    newString += possibleCharacters[ Math.floor(Math.random() * possibleCharacters.length) ];
  }

  return newString;
};

module.exports.generateRandomUrl = generateRandomUrl;

const formatTime = ({event_id, start_dates, start_times, end_dates, end_times, time_zone}) => {
  const start_time = `${start_dates}T${start_times}:00`;
  const end_time = `${end_dates}T${end_times}:00`;

  return {event_id, start_time, end_time, time_zone};
};

// Formate times from CreateEvent form into vaild database objects
const formatTimes = ({event_id, start_dates, start_times, end_dates, end_times, time_zone}) => {
  // console.log('\n****form times:\n', {event_id, start_dates, start_times, end_dates, end_times, offset}, '\n');
  const times = [];

  if (Array.isArray(start_dates)) {
    for (const index in start_dates) {
      times.push(formatTime({
        event_id,
        start_dates: start_dates[index],
        start_times: start_times[index],
        end_dates: end_dates[index],
        end_times: end_times[index],
        time_zone
      }));

    }
  } else {
    times.push(formatTime({event_id, start_dates, start_times, end_dates, end_times, time_zone}));
  }
  return times;
};

module.exports.formatTimes = formatTimes;

// Format vote data from viewEvent form into valid database objects
const formatVotes = (formData, user) => {
  const newVotes = [];
  const updateVotes = [];

  // construct votes from form data
  for (const key in formData) {
    const vote = {};

    // add user_id to vote
    vote.user_id = user.id;

    if (key.includes('vote')) { // only process vote form data

      // Split key into vote_id and time_id
      const keyParts = key.split('-');

      // Add vote_id (if present) and time_id to vote
      for (let i = 0; i < keyParts.length; i++) {
        if (keyParts[i] === 'id' && !isNaN(keyParts[i + 1]) || keyParts[i] === 'time_id') {
          vote[keyParts[i]] = Number(keyParts[i + 1]);
        }
      }

      // Add vote boolean to vote
      if (formData[key] === 'true') {
        vote.vote = true;

      } else if (formData[key] === 'false') {
        vote.vote = false;

      } else {
        vote.vote = null;
      }

      // Add constructed vote object to appropiate array based on the presense of an existing vote.id
      if (Object.hasOwnProperty.call(vote, 'id')) {
        updateVotes.push(vote);
      } else {
        newVotes.push(vote);
      }
    }
  }
  return {newVotes, updateVotes};
};

module.exports.formatVotes = formatVotes;


