export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} <strong>Rafki Haykhal Alif</strong>. Semua hak dilindungi.
        </p>
        <p className="mt-1">
          Dibuat dengan ❤️ menggunakan <span className="text-blue-600 font-medium">Next.js</span>
        </p>
      </div>
    </footer>
  );
}
