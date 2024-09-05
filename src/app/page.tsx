import "./Homepage.module.css";
import Cards from "./components/HomePage/cards";
import getPosts from "./utils/getPosts";

export default async function Home() {
  const posts = await getPosts();

  return <Cards posts={posts} />;
}
