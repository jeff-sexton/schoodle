$(() => {
  const $table = $(eventTimesTable);
  const ejsLocals = JSON.parse($('#variableJSON').text());
  $('#variableJSON').remove();
  const times = ejsLocals.times;
  const guests = ejsLocals.guests;

  const monthToString = (month) => {
    switch (month) {
      case 1: return 'Jan ';
      case 2: return 'Feb ';
      case 3: return 'Mar ';
      case 4: return 'Apr ';
      case 5: return 'May ';
      case 6: return 'Jun ';
      case 7: return 'Jul ';
      case 8: return 'Aug ';
      case 9: return 'Sep ';
      case 10: return 'Oct ';
      case 11: return 'Nov ';
      case 12: return 'Dec ';
      default: return 'Error invalid month';
    }
  }

  const appendDateToTable = (month, day) => {
    const $heading = $('<th>').attr('scope', 'col').text(monthToString(month) + day);
    $table.children("thead").children("tr").append($heading);
  }

  const getDropdown = (voteValue) => {
    let selection = voteValue ? 'Yes' : 'No';
    if (voteValue === null) {
      selection = '-';
    }
    return $(`<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${selection}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Yes</a>
      <a class="dropdown-item" href="#">No</a>
      <a class="dropdown-item" href="#">-</a>
    </div>
  </div>`);
  }

  const appendUserToTable = () => {
    const $userRow = $('<tr>');
    const $rowHeading = $('<th>').attr('scope', 'row').text(ejsLocals.user.name);
    const $rowVote = $('<td>');
    $userRow.append($rowHeading);
    for (let i = 0; i < times.length; i++) {
      let tempRowVote = $rowVote.clone().append(getDropdown(ejsLocals.userVotes.userVotes[i].vote));
      $userRow.append(tempRowVote);
    };
    $table.children("tbody").append($userRow);
  }

  const appendGuestToTable = (guestNumber, name) => {
    const $guestRow = $('<tr>');
    const $rowHeading = $('<th>').attr('scope', 'row').text(name);
    const $rowVote = $('<td>');
    $guestRow.append($rowHeading);
    for (let i = 0; i < times.length; i++) {
      let tempText = guests[guestNumber].userVotes[i].vote ? 'Yes' : 'No';
      if (guests[guestNumber].userVotes[i].vote === null) {
        tempText = '-';
      }
      $guestRow.append($rowVote.clone().text(tempText));
    };
    $table.children("tbody").append($guestRow);
  }

  appendUserToTable();

  for (let i = 0; i < times.length; i++) {
    let date = new Date(times[i].start_time)
    appendDateToTable(date.getMonth() + 1, date.getDate());
  }

  for (let guestNumber = 0; guestNumber < guests.length; guestNumber++) {
    appendGuestToTable(guestNumber, guests[guestNumber].user.name);
  }

});
