import Cards from "./components/HomePage/cards";
import getPosts from "./utils/getPosts";
import "@/globals.css";

export default async function Home() {
  const posts = await getPosts();

  return <Cards posts={posts} />;
}
