/* eslint-env jquery */
/* global window */
/* global ClipboardJS */

const submitVote = function(event) {
  event.preventDefault();

  $.post('/votes', $(this).serialize())
    .then((data) => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      // call error handling here
    });
};

$(() => {
  new ClipboardJS('.copy-url');

  // Attach handler to sumbit vote form submission
  $('#vote-form').submit(submitVote);
});
