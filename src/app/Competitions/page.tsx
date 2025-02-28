import Competitions from "./Competitions";
import { Metadata } from "next";
import { getResults } from "../utils/competitions";

export const metadata: Metadata = {
    title: "Rezultati - Cro Cube Comp",
    description: "Rezultati za Cro Cube Comp natjecanja",
    keywords: ["Cro Cube Comp", "Rezultati"],
};

export default async function CompetitionsPage() {
    const competitions = await getResults();

    if (!competitions.success) {
        return <p>Nemoguće dohvatiti rezultate</p>;
    }
    return <Competitions competitions={competitions} />;
}
