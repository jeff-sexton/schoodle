/* eslint-env jquery */
/* global window */
/* global ClipboardJS */

const submitVote = function (event) {
  event.preventDefault();

  // Disable repeat form submissions

  // Remove submit handler
  $(this).off("submit", submitVote);
  // bind new handler to give error message
  $(this).submit(() => {
    console.log("Please only click submit once");
    return false;
  });

  // Post form content just once.
  $.post("/votes", $(this).serialize())
    .then((data) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      // call error handling here
    });
};

$(() => {
  new ClipboardJS(".copy-url");

  // Attach handler to sumbit vote form submission
  $("#vote-form").on("submit", submitVote);
});
