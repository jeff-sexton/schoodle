/* eslint-env jquery */
/* global window */

    // Refactor below to user propery jQuery?
const $createEvent = $(`
<main>
<header>
  <h1>Create New Event</h1>
</header>
<form method='POST' action='/events' id='create-event-form'>
  <section class='event-form-section'>
    <div class="form-group">
      <label for='event-title'>Event Title</label>
      <input type="text" class="form-control" id='event-title' name='title' placeholder="Name your event." required>
    </div>

    <div class="form-group">
      <label for='event-description'>Description</label>
      <textarea type="text" class="form-control" id='event-description' name='description' placeholder="Describe your event." rows="3"></textarea>
    </div>

    <div class="form-group">
      <label for='user-name'>Host Name</label>
      <input type="text" class="form-control" id='user-name' name='name' value='<%= locals.user.name %>' placeholder="Who's hosting?" required>
    </div>

    <div class="form-group">
      <label for='user-email'>Host Email</label>
      <input type="email" class="form-control" id='user-email' name='email' value='<%= locals.user.email %>' placeholder="@email" required>
      <small class="form-text text-muted">We'll never share your email with anyone else outside your event.</small>
    </div>
  </section>

  <section class='times-form-section'>
    <button id="eventAddTime">+Add Time</button>
    <table id="eventTimesTable" class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Option</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">Start Time</th>
          <td>
            <input type='date' name='start_dates' required>
            <input type='time' name='start_times' required>
          </td>
        </tr>

        <tr>
          <th scope="row">End Time</th>
          <td>
            <input type='date' name='end_dates' required>
            <input type='time' name='end_times' required>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <button type="submit" class="btn btn-primary">Create Event</button>
</form>
</main>`);


const submitEvent = function(event) {
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
};

const addTimeColumn = function(event) {
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

};

$(() => {

  // attach $createEvent view to window
  window.$createEvent = $createEvent;

  // Add handler to Add time button on $createEvent
  $createEvent.find("#eventAddTime").click(addTimeColumn);

  // Add submit form handler to $createEvent
  $createEvent.find('form').submit(submitEvent);
});
