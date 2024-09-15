function formatTime(seconds) {
  // Convert seconds to milliseconds without rounding
  const ms = seconds * 1000;

  // Calculate minutes, remaining seconds, and milliseconds
  const minutes = Math.floor(ms / 60000);
  const remainingSeconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000; // Corrected line

  // Initialize an array to hold the time parts
  let timeParts = [];

  // If there are minutes, add them to the time parts
  if (minutes > 0) {
    timeParts.push(`${minutes}:`);
  }

  // Add seconds and milliseconds to the time parts
  timeParts.push(`${remainingSeconds.toString().padStart(2, "0")}`);
  timeParts.push(`.${milliseconds.toString().padStart(3, "0").slice(0, 2)}`); // Updated line
  //console.log(`Formatted ${seconds}s to ${timeParts.join("")}`);
  // Return the formatted time string
  return timeParts.join("");
}
module.exports = formatTime;
