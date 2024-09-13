"use server";

import EventResults from "./EventResults";

export default async function CompetitionEvent({
  eventName,
  event,
}: {
  eventName: string;
  event: any[];
}) {
  return (
    <div className="event">
      <h3 className="event-name">{eventName}</h3>
      <EventResults event={event} />
    </div>
  );
}
