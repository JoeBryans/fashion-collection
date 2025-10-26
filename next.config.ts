import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "tqrjnvjzhfwvuvqbnmhr.supabase.co",
      },
    ]
  }
};

export default nextConfig;
