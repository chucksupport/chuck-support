import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Short link for the Support Chuck page (PayPal, Venmo, Cash App, crypto)
      {
        source: "/donate",
        destination: "/support-chuck",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
