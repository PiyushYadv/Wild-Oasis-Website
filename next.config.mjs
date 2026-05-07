/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [100, 80, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eictbbtfxxjtoztamnuc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  output: "export",
};

export default nextConfig;
