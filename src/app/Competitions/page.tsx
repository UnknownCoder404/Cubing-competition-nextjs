import { url } from "@/globals";
import Competitions from "./Competitions";
import { CompetitionResultsType } from "../Types/solve";

export const metadata = {
    title: "Rezultati - Cro Cube Comp",
    description: "Rezultati za sva natjecanja",
};

async function getResults(): Promise<
    | { success: false }
    | { parsed: CompetitionResultsType; success: true; status: number }
> {
    try {
        const data = await fetch(`${url.toString()}competitions/results`);
        const parsedJSON = await data.json();
        return {
            parsed: parsedJSON,
            success: data.ok,
            status: data.status,
        };
    } catch {
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
