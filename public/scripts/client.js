/* eslint-env jquery */
/* global window */
/* global $createEvent */
/* global $viewEvent */




$(() => {
  const $main = $('#main-content');
  // get user and render nav bar

  const clearMain = () => {
    $main.empty();
  };

  window.clearMain = clearMain;


  console.log(window.location.href);


  $("#myEventsBtn").click(function(event) {
    clearMain();
    event.preventDefault();
    $viewEvent.detach();
    $viewEvent.appendTo($main);

  });
  $("#createEventBtn").click(function(event) {
    clearMain();
    event.preventDefault();
    $createEvent.detach();
    $createEvent.appendTo($main);

  });

});
