"use server";

import EventResults from "./EventResults";
import CompetitionStyles from "./Competitions.module.css";
export default async function CompetitionEvent({
  eventName,
  event,
}: {
  eventName: string;
  event: any[];
}) {
  return (
    <div className={CompetitionStyles["event"]}>
      <h3 className={CompetitionStyles["event-name"]}>{eventName}</h3>
      <EventResults event={event} />
    </div>
  );
}
