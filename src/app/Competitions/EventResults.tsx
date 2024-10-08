"use server";

import Group from "./Group";
import CompetitionStyles from "./Competitions.module.css";
import { Result } from "../Types/solve";

function separateResultsByGroup(round: Result[]) {
  const groups: Result[][] = [[], []];
  round.forEach((result) => {
    groups[result.group - 1].push(result);
  });
  return groups;
}

interface EventProps {
  event: Result[][];
}

export default async function EventResults({ event }: EventProps) {
  const groups: Result[][][] = [[], []];
  event.forEach((round) => {
    const solversSeparatedByGroup = separateResultsByGroup(round);

    // We could use a for loop here but it would be less readable
    groups[0].push(solversSeparatedByGroup[0]);
    groups[1].push(solversSeparatedByGroup[1]);
  });

  return (
    <div className={CompetitionStyles["event-results"]}>
      <div className={CompetitionStyles["groups"]}>
        {groups.map((group, index) => {
          return <Group group={group} key={index} groupNumber={index + 1} />;
        })}
      </div>
    </div>
  );
}
