import Cards from "./components/HomePage/cards";
import getPosts from "./utils/getPosts";
import "@/globals.css";

export const metadata = {
  title: "Cro Cube Comp",
  description:
    "CroCubeComp je natjecanje Rubikove kocke u Hrvatskoj. Ova natjecanja prate WCA pravilnik.",
};

export default async function Home() {
  const posts = await getPosts();

  return <Cards posts={posts} />;
}
