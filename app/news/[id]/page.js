import { notFound } from "next/navigation";
import NewsDetail from "@/components/NewsDetail";
import { fetchNewsFromSources } from "@/utils/newsApis";
import { getCachedNews } from "@/utils/cache";

export async function generateMetadata(props) {
  const params = await props.params;
  const id = params.id;
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
}

export default async function NewsPage(props) {
  const params = await props.params;
  const id = params.id;
  const allNews = await getCachedNews(fetchNewsFromSources);
  const newsItem = allNews.find((news) => news.id === id);

  if (!newsItem) {
    notFound();
  }

  return <NewsDetail news={newsItem} />;
}
