function getCurrentDateTimeInZagreb() {
  const now = new Date();
  const options = { timeZone: "Europe/Zagreb", hour12: false };
  const zagrebDateTimeString = now.toLocaleString("en-US", options);

  // Parse the string to get date and time components
  const [datePart, timePart] = zagrebDateTimeString.split(", ");
  const [month, day, year] = datePart.split("/");
  const [hour, minute, second] = timePart.split(":");

  // Construct the date object
  const zagrebDateTimeObj = {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: parseInt(second),
  };

  return zagrebDateTimeObj;
}
module.exports = getCurrentDateTimeInZagreb;
