/* eslint-disable camelcase */
// generate url

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

const formatTime = ({event_id, start_dates, start_times, end_dates, end_times, offset}) => {
  const start_time = `${start_dates}T${start_times}:00${offset}`;
  const end_time = `${end_dates}T${end_times}:00${offset}`;

  return {event_id, start_time, end_time};
};


const formatTimes = ({event_id, start_dates, start_times, end_dates, end_times, offset}) => {
  console.log('\n****form times:\n', {event_id, start_dates, start_times, end_dates, end_times, offset}, '\n');
  const times = [];

  if (Array.isArray(start_dates)) {
    for (const index in start_dates) {
      times.push(formatTime({
        event_id,
        start_dates: start_dates[index],
        start_times: start_times[index],
        end_dates: end_dates[index],
        end_times: end_times[index],
        offset
      }));

    }
  } else {
    times.push(formatTime({event_id, start_dates, start_times, end_dates, end_times, offset}));
  }
  return times;

};

module.exports.formatTimes = formatTimes;


