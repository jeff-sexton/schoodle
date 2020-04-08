/* eslint-env jquery */

const submitVote = function(event) {
  event.preventDefault();

  console.log($(this).serialize());

  $.post('/votes', $(this).serialize());
    // .then(({event}) => { //more data is being passed if we switch to single page application...

    //   // event.url contains the string URL to redirect to
    //   window.location.href = `/events/${event.url}`;
    // });

};

$(() => {

  // Attach handler to sumbit vote form submission
  $('form').submit(submitVote);


});
