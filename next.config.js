/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'www.viinz.com', 'i.gaw.to', 'example.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
