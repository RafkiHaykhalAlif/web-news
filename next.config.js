/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Izinkan semua domain HTTPS (karena News API gambar dari banyak domain)
      },
      {
        protocol: "https",
        hostname: "images.bild.de", // Tambahkan domain ini
      },
    ],
    unoptimized: false, // Gunakan optimasi gambar Next.js
  },
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
