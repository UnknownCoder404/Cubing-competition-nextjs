import { url } from "@/globals";
import { Posts } from "../Types/posts";
import { getToken } from "./credentials";

export async function getPosts(): Promise<{
    parsed: Posts;
    response: Response;
    statusCode: number;
    success: boolean;
}> {
    try {
        const postsUrl = new URL(url);
        postsUrl.pathname = "/posts";

        const response = await fetch(postsUrl);
        const posts: Posts = await response.json();
        return {
            parsed: posts,
            response: response,
            statusCode: response.status,
            success: response.ok,
        };
    } catch (error: unknown) {
        throw new Error(`Error while getting posts: \n${error}`);
    }
}

export async function deletePost(id: string): Promise<{
    parsed: {
        message?: string;
    };
    response: Response;
    statusCode: number;
    success: boolean;
}> {
    const token = getToken();
    if (!token) {
        throw new Error("No token found");
    }
    try {
        const postsUrl = new URL(url);
        postsUrl.pathname = `/posts/delete/${id}`;
        const response = await fetch(postsUrl, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });
        const postDeletion = await response.json();

        return {
            parsed: postDeletion,
            response: response,
            statusCode: response.status,
            success: response.ok,
        };
    } catch (error) {
        throw new Error(`Error deleting post: \n${error}`);
    }
}
