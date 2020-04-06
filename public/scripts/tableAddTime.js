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

  $('#create-event-form').on('sumbit', (event) => {
    event.preventDefault();
    $.post('/events', this.serialize());

  });
});
