import axios from "axios";
import { formatNewsData } from "./dataFormatting";

// Fungsi utama untuk mengambil berita hanya dari News API
export const fetchNewsFromSources = async () => {
  try {
    console.log("Memulai proses pengambilan berita dari News API saja...");

    const news = await fetchFromNewsAPI();

    if (!news || news.length === 0) {
      console.log("❌ News API tidak mengembalikan berita");
      return [];
    }

    console.log(`✅ News API berhasil mendapatkan ${news.length} berita`);
    return formatNewsData(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// Fungsi untuk mengambil berita dari News API
const fetchFromNewsAPI = async () => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ News API key tidak dikonfigurasi");
      return [];
    }

    // Gunakan pencarian kata kunci jika country:id tidak mengembalikan berita
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        // country: "id", // Hapus/comment jika akun free
        q: "sport", // Hapus atau ganti dengan kata kunci lain, atau kosongkan
        pageSize: 10,
        apiKey,
      },
      timeout: 8000,
    });
    console.log("News API response:", response.data); // Tambahkan ini untuk debug

    if (
      !response.data ||
      !response.data.articles ||
      !Array.isArray(response.data.articles)
    ) {
      throw new Error("Format respons News API tidak valid");
    }

    return response.data.articles.map((article, index) => ({
      id: `newsapi-${index}`,
      title: article.title || "Judul tidak tersedia",
      summary: article.description || "Deskripsi tidak tersedia",
      content:
        article.content || article.description || "Konten tidak tersedia",
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || "News API",
      sourceUrl: article.url || "#",
      imageUrl: article.urlToImage || "/images/placeholder.jpg",
      category: "general",
    }));
  } catch (error) {
    console.error("❌ Error fetching from News API:", error.message);
    return [];
  }
};

export async function generateMetadata(props) {
  const params = await props.params;
  const { id } = params;
  // ...
}
