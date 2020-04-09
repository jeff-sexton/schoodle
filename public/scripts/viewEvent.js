/* eslint-env jquery */
/* global window */

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

  // Attach handler to sumbit vote form submission
  $('form').submit(submitVote);

});
