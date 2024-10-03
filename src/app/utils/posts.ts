import { url } from "@/globals";
import { Posts } from "../Types/posts";

export async function getPosts(): Promise<{
  parsed: Posts;
  response: Response;
  statusCode: number;
  sucess: boolean;
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
      sucess: response.ok,
    };
  } catch (error: unknown) {
    throw new Error(`Error while getting posts: \n${error}`);
  }
}
