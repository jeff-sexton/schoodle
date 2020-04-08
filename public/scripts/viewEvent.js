/* eslint-env jquery */

const submitVote = function(event) {
  event.preventDefault();

  console.log($(this).serialize());

};

$(() => {

  // Attach handler to sumbit vote form submission
  $('form').submit(submitVote);


});
