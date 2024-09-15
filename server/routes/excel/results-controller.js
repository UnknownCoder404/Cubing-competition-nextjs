const { Workbook } = require("exceljs");
const User = require("../../Models/user");
const Competition = require("../../Models/competition");
const formatTime = require("../../functions/formatTime");
/**
 *
 * @param {User} users
 * @param {Competition} competition
 */
async function getResultsInExcel(users, competition) {
  // users - all users in moongodb
  // competition for which we will return results
  console.time("getResultsInExcel");
  try {
    const workbook = new Workbook();
    const compId = competition._id;
    competition.events.forEach((event) => {
      // Filtering users for event
      const usersFiltered = filterUsersForEvent(users, competition, event.name);
      const rounds = [];
      // Creating rounds
      for (let i = 0; i < event.rounds; i++) {
        rounds.push({
          header: `Runda ${i + 1}`,
          key: `round${i + 1}`,
          width: 30,
        });
      }
      // Create a worksheet for each event
      let worksheet = workbook.addWorksheet(event.name);
      worksheet.columns = [
        { header: "Ime", key: "name", width: 50 },
        ...rounds,
      ];
      usersFiltered.forEach((user) => {
        // There are users that have this competition, but not this event
        const comp = user.competitions.find((comp) => {
          return comp.competitionId.equals(compId);
        });
        if (!comp)
          throw new Error("Competition not found, so filtering did not work.");

        const userEvent = comp.events.find((userEvent) => {
          return userEvent.event === event.name;
        });
        if (!userEvent) return;
        // These are the users that have this competition and this event
        const row = {
          name: user.username,
        };
        userEvent.rounds.forEach((round, index) => {
          if (!round) return;
          let solves = round.slice(); // Create a copy of object
          if (!solves || solves.length === 0) return;
          solves.forEach((solve, index) => {
            solves[index] = formatTime(solve);
          });
          row[`round${index + 1}`] = solves.join(", ");
        });
        worksheet.addRow(row);
        worksheet = autoSizeColumnsInASheet(worksheet);
      });
    });
    //await workbook.xlsx.writeFile(`./${competition.name}.xlsx`);
    console.timeEnd("getResultsInExcel");
    return workbook;
  } catch (error) {
    console.error(error);
  }
}
function filterUsersForEvent(users, competition, eventName) {
  const filteredUsers = [];
  users.forEach((user) => {
    const comp = user.competitions.find((comp) => {
      return comp.competitionId.equals(competition._id);
    });
    if (comp) {
      comp.events.forEach((event) => {
        if (event.event === eventName) {
          filteredUsers.push(user);
        }
      });
    } else {
      console.log("Comp not found on user with username " + user.username);
    }
  });
  console.log(`${filteredUsers.length} users found for event ${eventName}`);
  return filteredUsers;
}
function autoSizeColumnsInASheet(worksheet) {
  // Auto size width of the column
  worksheet.columns.forEach(function (column, i) {
    let maxLength = 0;
    column["eachCell"]({ includeEmpty: true }, function (cell) {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  return worksheet;
}
module.exports = getResultsInExcel;
