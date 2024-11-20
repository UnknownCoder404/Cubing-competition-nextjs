import { Metadata } from "next";
import Cards from "./components/HomePage/cards";
import { getPosts } from "./utils/posts";

export const metadata: Metadata = {
    title: "Cro Cube Comp",
    description:
        "CroCubeComp je natjecanje Rubikove kocke u Hrvatskoj. Ova natjecanja prate WCA pravilnik.",
    keywords: [
        "Cro Cube Comp",
        "Natjecanje iz Rubikove kocke",
        "Cro Cube Club",
        "Cro.cube.club@gmail.com",
    ],
    verification: {
        google: "p4gzWQ-1iXVG0l_lfeyeSHMr_37F_pq6QH3hu8zmL40",
    },
};

export default async function Home() {
    const posts = (await getPosts()).parsed;

    return <Cards posts={posts} />;
}
