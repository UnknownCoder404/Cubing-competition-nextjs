import { url } from "@/globals";
import Competitions from "./Competitions";
import { Result } from "./EventResults";

interface EventDetails {
  [key: string]: Result[][];
}
export type CompetitionType = {
  _id: string;
  name: string;
  date: string; // ISO date string
  isLocked: boolean;
  events: EventDetails;
};
export type CompetitionsType = {
  [key: string]: CompetitionType;
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
