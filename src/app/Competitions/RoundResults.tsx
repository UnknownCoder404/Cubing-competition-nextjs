"use client";
import CompetitionStyles from "./Competitions.module.css";
import { Result } from "./EventResults";

function formatTime(seconds: number) {
  // Convert seconds to milliseconds without rounding
  const ms = seconds * 1000;

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
export default function RoundResults({
  round,
  show,
}: {
  round: Result[];
  show: boolean;
}) {
  return (
    <div
      className={`${CompetitionStyles["round-results"]} ${
        !show ? CompetitionStyles["hidden"] : ""
      }`}
    >
      {round.map((result, index) => {
        return (
          <div className={CompetitionStyles["solver"]}>
            <p className={CompetitionStyles["solve"]}>
              {index + 1}. {result.username}{" "}
              {result.solves.map((solve) => formatTime(solve)).join(" ")} (Ao5{" "}
              {formatTime(+result.average)})
            </p>
          </div>
        );
      })}
    </div>
  );
}
