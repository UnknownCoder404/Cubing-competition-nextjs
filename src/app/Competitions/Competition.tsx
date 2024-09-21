"use server";

import { CompetitionType } from "../Types/solve";
import CompetitionEvent from "./CompetitionEvent";
import CompetitionStyles from "./Competitions.module.css";

function CompetitionName({ name }: { name: string }) {
  return (
    <h2 className={CompetitionStyles["comp-name-h2"]}>
      {name ? name : "Ime natjecanja nije dostupno"}
    </h2>
  );
}

function CompetitionDate({ date }: { date: string }) {
  const dateInLocalString = new Date(date).toLocaleString();
  return (
    <>
      <p className={CompetitionStyles["comp-date-p"]}>{dateInLocalString}</p>
    </>
  );
}

export default async function Competition(props: {
  competition: CompetitionType;
  competitionName: string;
}) {
  const competition = props.competition;
  const competitionName = props.competitionName;
  const competitionDateString = competition.date;
  return (
    <>
      <div className={CompetitionStyles["comp-info"]}>
        <CompetitionName name={competitionName} />
        <CompetitionDate date={competitionDateString} />
      </div>
      {
        /* Render the competition events */
        Object.keys(competition.events).map((eventName, index) => {
          const event = competition.events[eventName];
          return (
            <CompetitionEvent eventName={eventName} key={index} event={event} />
          );
        })
      }
    </>
  );
}
