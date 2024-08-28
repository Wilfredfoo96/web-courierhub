/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "s3.ap-southeast-1.amazonaws.com" },
      { hostname: "seller.tracking.my" },
    ],
  },
};

export default nextConfig;
