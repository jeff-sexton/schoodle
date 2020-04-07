/* eslint-env jquery */
/* global window */

$(() => {
  $("#eventAddTime").click(function(event) {
    event.preventDefault();
    const $heading = $('<th>').attr('scope', 'col').text('Option');

    const $startDayTime = $('<td>').append(
      $('<input>').attr({'type': 'date', 'name':'start_dates',}).prop('required',true),
      $('<input>').attr({'type': 'time', 'name':'start_times'}).prop('required',true)
    );

    const $endDayTime = $('<td>').append(
      $('<input>').attr({'type': 'date', 'name':'end_dates'}).prop('required',true),
      $('<input>').attr({'type': 'time', 'name':'end_times'}).prop('required',true)
    );

    const $table = $(this).parent().find('table');

    $table.children("thead").children("tr").append($heading);
    $table.children("tbody").children("tr").first().append($startDayTime);
    $table.children("tbody").children("tr").last().append($endDayTime);
  });

  $('form').submit(function(event) {
    event.preventDefault();

    // get local time zone offset to UTC in hours
    const offset = new Date().getTimezoneOffset() / -60;
    //format as 2 digit string
    let offsetStr = String(Math.abs(offset)).padStart(2,'0');
    if (offset < 0) {
      offsetStr = `-${offsetStr}`;
    } else {
      offsetStr = `+${offsetStr}`;
    }

    //Get form data and append timezone offset string
    let formData = $(this).serialize();
    formData += `&offset=${offsetStr}`;

    $.post('/events', formData)
      .then(({event}) => { //more data is being passed if we switch to single page application...

        // event.url contains the string URL to redirect to
        window.location.href = `/events/${event.url}`;
      });
  });
});
