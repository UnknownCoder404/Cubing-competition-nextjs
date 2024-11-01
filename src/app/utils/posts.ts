import { url } from "@/globals";
import { Posts } from "../Types/posts";
import { addToken, getToken } from "./credentials";

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

export async function createPost(title: string, description: string) {
    // Validate input
    if (!title || !description) {
        throw new Error("Title and description are required");
    }

    try {
        const headers =
            addToken({
                "Content-Type": "application/json",
            }) || {};
        const createPostUrl = new URL(url);
        createPostUrl.pathname = "/posts/new";
        // Attempt to create a new post
        const response = await fetch(createPostUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ title, description }),
        });
        const data = await response.json();

        return {
            success: response.ok,
            statusCode: response.status,
            parsed: data,
            response: response,
        };
    } catch (error) {
        // Handle errors
        console.error("Failed to create post:", error);
        return {
            error,
            statusCode: 500,
            success: false,
        };
    }
}
