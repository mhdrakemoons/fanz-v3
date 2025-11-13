import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure the workspace root is this project, not a parent directory
    root: __dirname,
  },
};

export default nextConfig;
