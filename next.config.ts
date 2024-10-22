import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {
  poweredByHeader: false /* Do not show x-powered-by header */,
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}
export default nextConfig;
