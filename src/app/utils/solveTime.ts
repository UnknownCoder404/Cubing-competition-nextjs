export function getAverage(solves: number[] | undefined) {
  if (!solves) return "Potrebno 5 slaganja";
  const noFormatAverage = getAverageNoFormat(solves);
  return typeof noFormatAverage === "string"
    ? formatTime(noFormatAverage)
    : noFormatAverage === -1
    ? "Potrebno 5 slaganja"
    : "DNF";
}
export function getAverageNoFormat(solves: number[]) {
  if (solves.length !== 5) {
    return -1;
  }

  // Create a copy of the solves array
  let sortedSolves = solves.slice();

  sortedSolves.sort((a, b) => {
    if (a === 0) return 1; // Place 0 at the last element
    if (b === 0) return -1; // Place 0 at the last element
    return a - b; // Regular sorting for other numbers
  });
  // Remove the smallest and largest elements
  let trimmedSolves = sortedSolves.slice(1, sortedSolves.length - 1);

  // Calculate average
  let average =
    trimmedSolves.reduce((acc, val) => acc + val, 0) / trimmedSolves.length;

  // Check if trimmedSolves contains DNF
  if (trimmedSolves.includes(0)) {
    return 0;
  }

  // Return average rounded to 2 decimal places
  return average.toFixed(2);
}
export function formatTime(seconds: number | string) {
  // Convert seconds to milliseconds without rounding
  const ms = +seconds * 1000;

  // Calculate minutes, remaining seconds, and milliseconds
  const minutes = Math.floor(ms / 60000); // Get minutes
  const remainingSeconds = Math.floor((ms % 60000) / 1000); // Get remaining seconds
  const milliseconds = ms % 1000; // Get milliseconds
  // Initialize an array to hold the time parts
  let timeParts = [];

  // If there are minutes, add them to the time parts
  if (minutes > 0) {
    timeParts.push(`${minutes}:`);
  }

  // Add seconds and milliseconds to the time parts
  timeParts.push(`${remainingSeconds.toString().padStart(2, "0")}`);
  timeParts.push(`.${milliseconds.toString().padStart(3, "0").slice(0, 2)}`);
  const formattedTime = timeParts.join("");
  // Return the formatted time string
  return formattedTime;
}
