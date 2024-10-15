/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["openweathermap.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tmqkkrunjxxrrlkjxkqq.supabase.co",
        pathname: "/**"
      }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
