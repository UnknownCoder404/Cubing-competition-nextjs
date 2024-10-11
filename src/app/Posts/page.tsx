import { Metadata } from "next";
import { getPosts } from "../utils/posts";
import PostsPage from "./PostsPage";

export const metadata: Metadata = {
  title: "Objave - Cro Cube Comp",
  description: "Upravljaj objavama na Cro Cube Comp stranici.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Posts() {
  const posts = (await getPosts()).parsed;

  return <PostsPage posts={posts} />;
}
