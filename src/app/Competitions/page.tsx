import { url } from "@/globals";
import Competitions from "./Competitions";

interface EventDetails {
  [key: string]: any[]; // Using an index signature to allow any EventType as a key
}
export type CompetitionsType = {
  date: string; // ISO date string
  isLocked: boolean;
  events: EventDetails;
};

async function getResults(): Promise<
  | { success: false }
  | { parsed: CompetitionsType; success: true; status: number }
> {
  try {
    const data = await fetch(`${url.toString()}competitions/results`);
    const parsedJSON = await data.json();
    return {
      parsed: parsedJSON,
      success: data.ok,
      status: data.status,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
export default async function CompetitionsPage() {
  const competitions = await getResults();

  if (!competitions.success) {
    return <p>Nemoguće dohvatiti rezultate</p>;
  }
  return <Competitions competitions={competitions} />;
}
