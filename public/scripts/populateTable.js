$(() => {
  const $table = $(eventTimesTable);
  const ejsLocals = JSON.parse($('#variableJSON').text());
  $('#variableJSON').remove();
  const times = ejsLocals.times;
  const guests = ejsLocals.guests;
  console.log(ejsLocals);

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

  const appendGuestToTable = (name) => {
    const $guestRow = $('<tr>');
    const $rowHeading = $('<th>').attr('scope', 'row').text(name);
    const $rowVote = $('<td>').text('Yes/No');
    $guestRow.append($rowHeading);
    for (let i = 0; i < times.length; i++) {
      $guestRow.append($rowVote.clone());
    };
    $table.children("tbody").append($guestRow);
  }

  // const appendVotesToTable = () => {
  //   const $rowVote = $('<td>').text('Yes/No');
  //   $table.children("tbody").children("tr").append($rowVote);
  // }

  for (let i = 0; i < times.length; i++) {
    let date = new Date(times[i].start_time)
    appendDateToTable(date.getMonth() + 1, date.getDate());
  }

  for (let i = 0; i < guests.length; i++) {
    console.log(guests[i])
    appendGuestToTable(guests[i].user.name);
  }

  // appendVotesToTable();

})
