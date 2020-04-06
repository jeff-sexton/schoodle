/* eslint-env jquery */

$(() => {

  $("#eventAddTime").click(function (e) {
    e.preventDefault();
    const $heading = $('<th>').attr('scope', 'col').text('Day-Start-End');
    const $vote = $('<td>').text('Yes/No');
    const table = $(this.parentNode.children[5]);
    table.children("thead").children("tr").append($heading);
    table.children("tbody").children("tr").append($vote);
  });

  $('form').submit( function(event) {
    event.preventDefault();
    console.log('test');
    console.log('*** event/user inputs', $(".event-form-section").find("input, textarea, select").serialize());
    console.log('*** times inputs', $(".times-form-section").find("input, textarea, select").serialize());

    $.post('/events', $(this).serialize());

  });
});
