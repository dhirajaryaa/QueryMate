import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/u/167156303?s=400&u=dccf549be67c019fd4db9c1a474fecd9a1c208a7&v=4'),
    ],
  },
};

export default nextConfig;
