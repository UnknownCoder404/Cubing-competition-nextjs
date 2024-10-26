import type { MetadataRoute } from "next";

// @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
const robots = (): MetadataRoute.Robots => ({
    rules: [
        {
            userAgent: "*",
            allow: "*",
            disallow: [
                "/Login",
                "/Register",
                "/Advanced-Dashboard",
                "/Dashboard",
            ],
        },
    ],
});

export default robots;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
