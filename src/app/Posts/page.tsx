import { Metadata } from "next";
import { getPosts } from "../utils/posts";
import PostsPage from "./PostsPage";
import ProtectedRoute from "../components/Common/ProtectedRoute";

export const metadata: Metadata = {
    title: "Objave - Cro Cube Comp",
    description: "Upravljaj objavama na Cro Cube Comp stranici.",
    keywords: ["Upravljanje objavama", "Cro Cube Comp"],
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Posts() {
    const posts = (await getPosts()).parsed;

    return (
        <ProtectedRoute require="admin" redirectTo="/Login" validateToken>
            <PostsPage posts={posts} />
        </ProtectedRoute>
    );
}
