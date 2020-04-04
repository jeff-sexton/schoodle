/* eslint-env jquery */

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (const user of users.data) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});
