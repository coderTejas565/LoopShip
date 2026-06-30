/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/trpc/:path*",
        destination: "https://loopship.onrender.com/trpc/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "https://loopship.onrender.com/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;