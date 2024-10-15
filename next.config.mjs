/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tmqkkrunjxxrrlkjxkqq.supabase.co",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/**"
      }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
