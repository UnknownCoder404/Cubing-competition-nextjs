import Link from "next/link";
import "./Homepage.module.css";
import Cards from "./components/HomePage/cards";
import getPosts from "./utils/getPosts";

const cards: { title: string; description: React.ReactNode | string }[] = [
  {
    title: "Natjecanja",
    description: (
      <p>
        Listu natjecanja i rezultate možete pronaći{" "}
        <Link href="/Competitions">ovdje</Link>.
      </p>
    ),
  },
  {
    title: "Pravila",
    description: (
      <p>
        Službena pravila natjecanja možete pronaći{" "}
        <Link href="/Rules">ovdje</Link>.
      </p>
    ),
  },
  {
    title: "Vježbanje",
    description: (
      <p>
        Ponavljanje je majka znanja! Vježbaj i ti{" "}
        <Link href="/Scramble">ovdje</Link>.
      </p>
    ),
  },
  {
    title: "Dijeljenje",
    description: (
      <p>
        <span>Pozovi</span> svoje prijatelje
      </p>
    ),
  },
];

export default async function Home() {
  const posts = await getPosts();

  return <Cards cards={cards} posts={posts} />;
}
