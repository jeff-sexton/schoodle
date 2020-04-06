/* eslint-env jquery */

$(() => {

  $("#eventAddTime").click(function(event) {
    event.preventDefault();
    const $heading = $('<th>').attr('scope', 'col').text('Option');

    const $startDayTime = $('<td>').append(
      $('<input>').attr({'type': 'date', 'name':'start_date',}).prop('required',true),
      $('<input>').attr({'type': 'time', 'name':'start_time'}).prop('required',true)
    );

    const $endDayTime = $('<td>').append(
      $('<input>').attr({'type': 'date', 'name':'end_date'}).prop('required',true),
      $('<input>').attr({'type': 'time', 'name':'end_time'}).prop('required',true)
    );

    const $table = $(this).parent().find('table');

    $table.children("thead").children("tr").append($heading);
    $table.children("tbody").children("tr").first().append($startDayTime);
    $table.children("tbody").children("tr").last().append($endDayTime);
  });

  $('form').submit(function(event) {
    event.preventDefault();
    $.post('/events', $(this).serialize());
  });
});
