import { NextConfig } from "next";

const nextConfig: NextConfig = {};
const withVercelToolbar = require("@vercel/toolbar/plugins/next")();
export default withVercelToolbar(nextConfig);
