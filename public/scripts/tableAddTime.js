/* eslint-env jquery */

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


    const offset = new Date().getTimezoneOffset() / -60; // get local time zone offset to UTC in hours
    let offsetStr = String(Math.abs(offset)).padStart(2,'0'); //format as 2 digit string
    if (offset < 0) {
      offsetStr = `-${offsetStr}`;
    } else {
      offsetStr = `+${offsetStr}`;
    }

    let formData = $(this).serialize();
    formData += `&offset=${offsetStr}`;

    $.post('/events', formData);
  });
});
