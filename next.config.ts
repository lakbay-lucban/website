import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export"
  // for static export ^^
  images: {
    remotePatterns: [
    {
      protocol: "https",
      hostname: "mvkazrytlggaslvvktcn.supabase.co",
      pathname: "/storage/v1/object/public/Images/**",
    },
  ],
  },
};

export default nextConfig;