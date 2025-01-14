/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    }]
  },
  reactStrictMode: false//로그 한 번만
};

export default nextConfig;
