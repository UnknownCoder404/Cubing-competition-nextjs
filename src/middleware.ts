import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { url } from "@/globals";

async function isTokenValid(token: string): Promise<boolean> {
  const tokenValidUrl = `${url}token?token=${token}`;
  const response = await fetch(tokenValidUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.ok;
}

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);
  const reqCookies = cookies();
  const token = reqCookies.get("token")?.value;
  if (token) {
    const tokenValidity = await isTokenValid(token);
    requestHeaders.set("x-token", token);
    requestHeaders.set("x-token-valid", tokenValidity.toString());
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
