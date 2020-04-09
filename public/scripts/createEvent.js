/* eslint-env jquery */
/* global window */

// Add time button actions
const addTime = function(event) {
  event.preventDefault();

  const $heading = $('<th>').attr('scope', 'col').text('Event Time').append(
    $('<button>').addClass('btn btn-outline-danger btn-sm remove-time').append(
      $('<div>').addClass('delete-cal-icon').html('<i class="far fa-calendar-times"></i>')
    )
  );

  const $startDayTime = $('<td>').append(
    $('<div>').addClass('event-time-div').append(
      $('<input>').attr({'type': 'date', 'name':'start_dates',}).prop('required',true),
      $('<input>').attr({'type': 'time', 'name':'start_times'}).prop('required',true)
    )
  );

  const $endDayTime = $('<td>').append(
    $('<div>').addClass('event-time-div').append(
      $('<input>').attr({'type': 'date', 'name':'end_dates'}).prop('required',true),
      $('<input>').attr({'type': 'time', 'name':'end_times'}).prop('required',true)
    )
  );

  const $table = $(this).parents('table');

  $table.children("thead").children("tr").children('th').last().before($heading);
  $table.children("tbody").children("tr").first().append($startDayTime);
  $table.children("tbody").children("tr").last().append($endDayTime);

  // Attach event handler to just added header button
  $('.remove-time').last().click(function(event) {
    event.preventDefault();

    const $header = $(this).parent('th');
    const colIndex = $header.siblings().length - 1;

    const $startTime = $header.parents('thead').next('tbody').children('tr').first().children('td')[colIndex - 1];
    const $endTime = $header.parents('thead').next('tbody').children('tr').last().children('td')[colIndex - 1];

    $header.remove();
    $startTime.remove();
    $endTime.remove();

  });
};

// CreateEvent button actions
const createEvent = function(event) {
  event.preventDefault();

  // removing because there is no way to localize the users arriving at the view page
  // will document timezone with user setting on create page instead

  // // get local time zone offset to UTC in hours
  // const offset = new Date().getTimezoneOffset() / -60;
  // //format as 2 digit string
  // let offsetStr = String(Math.abs(offset)).padStart(2,'0');
  // if (offset < 0) {
  //   offsetStr = `-${offsetStr}`;
  // } else {
  //   offsetStr = `+${offsetStr}`;
  // }

  // //Get form data and append timezone offset string
  // let formData = $(this).serialize();
  // formData += `&offset=${offsetStr}`;

  $.post('/events', $(this).serialize())
    .then(({event}) => { //more data is being passed if we switch to single page application...

      // event.url contains the string URL to redirect to
      window.location.href = `/events/${event.url}`;
    });
};

$(() => {
  // Attach handler to Add time Button
  $("#add-time-btn").click(addTime);

  // Attach handler to Create event form submission
  $('form').submit(createEvent);
});
