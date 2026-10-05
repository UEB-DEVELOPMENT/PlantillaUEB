import path from "node:path";
import type { NextConfig } from "next";

const srcDir = path.join(__dirname, "src");

const nextConfig: NextConfig = {
  transpilePackages: ["@ueb-development/ui-core"],
  webpack(config) {
    // Los SVG de src/ se importan como componentes React (SVGR).
    config.module.rules.push({
      test: /\.svg$/,
      include: srcDir,
      use: ["@svgr/webpack"],
    });
    // El resto (p. ej. los assets de @ueb-development/ui-core) se importan como URL.
    config.module.rules.push({
      test: /\.svg$/,
      exclude: srcDir,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
