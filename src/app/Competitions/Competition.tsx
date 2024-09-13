"use server";

import CompetitionEvent from "./CompetitionEvent";

function CompetitionName({ name }: { name: string }) {
  if (!name) {
    return <h2 className="comp-name-h2">Ime natjecanja nije dostupno</h2>;
  }
  return (
    <>
      <h2 className="comp-name-h2">{name}</h2>
    </>
  );
}

function CompetitionDate({ date }: { date: any }) {
  const dateInLocalString = new Date(date).toLocaleString();
  return (
    <>
      <p className="comp-date-p">{dateInLocalString}</p>
    </>
  );
}

export default async function Competition(props: {
  competition: any;
  competitionName: string;
}) {
  const competition = props.competition;
  const competitionName = props.competitionName;
  const competitionDate = competition.date;
  return (
    <>
      <CompetitionName name={competitionName} />
      <CompetitionDate date={competitionDate} />
      {
        /* Render the competition events */
        Object.keys(competition.events).map((eventName, index) => {
          console.log(`Looping through ${eventName}`);
          const event = competition.events[eventName];
          return (
            <CompetitionEvent eventName={eventName} key={index} event={event} />
          );
        })
      }
    </>
  );
}
