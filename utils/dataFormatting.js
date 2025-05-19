import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

// Fungsi untuk memformat data berita
export const formatNewsData = (newsArray) => {
  if (!Array.isArray(newsArray)) {
    console.error("formatNewsData: Input bukan array");
    return [];
  }

  return newsArray
    .map((news) => {
      try {
        return {
          ...news,
          // Format waktu yang seragam: "Senin, 17 Mei 2025 14:30 WIB"
          formattedDate: formatDate(news.publishedAt),
          // Seragamkan panjang judul (maks 70 karakter)
          normalizedTitle: normalizeTitle(news.title),
          // Seragamkan URL gambar (gunakan placeholder jika tidak ada)
          normalizedImageUrl: normalizeImageUrl(news.imageUrl),
        };
      } catch (error) {
        console.error("Error formatting news item:", error);
        // Jika terjadi error pada satu item, skip item tersebut
        return null;
      }
    })
    .filter(Boolean); // Hapus item null
};

// Format tanggal
export const formatDate = (dateString) => {
  try {
    const date =
      typeof dateString === "string"
        ? parseISO(dateString)
        : new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Tanggal tidak tersedia";
    }
    return format(date, "EEEE, d MMMM yyyy HH:mm 'WIB'", { locale: id });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Tanggal tidak tersedia";
  }
};

// Normalisasi judul
export const normalizeTitle = (title) => {
  if (!title) return "Judul tidak tersedia";
  return title.length > 70 ? `${title.substring(0, 67)}...` : title;
};

// Normalisasi URL gambar
export const normalizeImageUrl = (imageUrl) => {
  // Jika tidak ada gambar, gunakan placeholder
  if (!imageUrl) {
    return "/images/placeholder.jpg";
  }

  // Jika URL gambar valid (http/https), gunakan langsung
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // Jika URL sudah merupakan path lokal, gunakan apa adanya
  return imageUrl;
};
