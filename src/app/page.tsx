import Cards from "./components/HomePage/cards";
import { getPosts } from "./utils/posts";

export const metadata = {
    title: "Cro Cube Comp",
    description:
        "CroCubeComp je natjecanje Rubikove kocke u Hrvatskoj. Ova natjecanja prate WCA pravilnik.",
};

export default async function Home() {
    const posts = (await getPosts()).parsed;

    return <Cards posts={posts} />;
}
