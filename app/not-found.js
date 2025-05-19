import Link from "next/link";

export const metadata = {
  title: "404 - Halaman Tidak Ditemukan",
  description: "Halaman yang Anda cari tidak ditemukan",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
