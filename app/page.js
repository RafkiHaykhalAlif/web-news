import { Suspense } from "react";
import NewsList from "@/components/NewsList";
import NewsListSkeleton from "@/components/NewsListSkeleton";
import { getCachedNews } from "@/utils/cache";
import { fetchNewsFromSources } from "@/utils/newsApis";

export const metadata = {
  title: "Website News - Beranda",
  description: "Berita terkini dari berbagai sumber tepercaya",
};

export default async function Home() {
  const initialNews = await getCachedNews(fetchNewsFromSources);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Selamat Datang di Website News</h1>
          <p className="text-lg">
            Dapatkan update berita terkini dari berbagai sumber terpercaya
          </p>
        </div>
      </section>

      {/* Daftar berita + filter (semuanya dalam NewsList) */}
      <section className="container mx-auto px-4 py-8">
        <Suspense fallback={<NewsListSkeleton />}>
          <NewsList initialNews={initialNews} />
        </Suspense>
      </section>
    </main>
  );
}
