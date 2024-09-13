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
    <>
      <h2 className="comp-event-h2">{eventName}</h2>
      <EventResults event={event} />
    </>
  );
}
