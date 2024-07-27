/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
    CLOUDINARY_UPLOADPRESET: process.env.CLOUDINARY_UPLOADPRESET,
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
