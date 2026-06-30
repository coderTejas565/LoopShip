/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://loopship.onrender.com/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;