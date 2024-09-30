import getPosts from "../utils/getPosts";
import PostsPage from "./PostsPage";

export const metadata = {
  title: "Objave - Cro Cube Comp",
  description: "Upravljaj objavama na Cro Cube Comp stranici.",
};

export default async function Posts() {
  const posts = await getPosts();
  return (
    <>
      <PostsPage posts={posts} />
    </>
  );
}
