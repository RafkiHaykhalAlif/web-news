import { notFound } from "next/navigation";
import NewsDetail from "@/components/NewsDetail";
import { fetchNewsFromSources } from "@/utils/newsApis";
import { getCachedNews } from "@/utils/cache";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    // Gunakan cache untuk mengurangi API calls
    const allNews = await getCachedNews(fetchNewsFromSources);
    const newsItem = allNews.find((news) => news.id === id);

    if (!newsItem) {
      return {
        title: "Berita tidak ditemukan - Portal Berita",
        description: "Berita yang Anda cari tidak ditemukan",
      };
    }

    return {
      title: `${newsItem.title} - Portal Berita`,
      description: newsItem.summary || "Detail berita",
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Portal Berita",
      description: "Detail berita",
    };
  }
}

export default async function NewsPage({ params }) {
  const { id } = params;

  try {
    // Gunakan cache untuk mengurangi API calls
    const allNews = await getCachedNews(fetchNewsFromSources);
    const newsItem = allNews.find((news) => news.id === id);

    if (!newsItem) {
      notFound();
    }

    return <NewsDetail news={newsItem} />;
  } catch (error) {
    console.error("Error fetching news item:", error);
    notFound();
  }
}
