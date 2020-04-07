/* eslint-env jquery */
/* global window */

// Refactor below to user propery jQuery?
const $viewEvent = $(`
  <header>
    <h1>View Event Page</h1>
  </header>
  `);


const submitVotes = function(event) {
  event.preventDefault();
  console.log('Submit Votes?');

};


$(() => {

  // attach $createEvent view to window
  window.$viewEvent = $viewEvent;

  // Add submit form handler to $viewEvent
  $viewEvent.find('form').submit(submitVotes);
});
