let newsCache = {
  data: null,
  timestamp: 0,
};

export const getCachedNews = async (fetchFunction) => {
  const CACHE_DURATION = 15 * 60 * 1000; // 15 menit dalam milidetik
  const now = Date.now();

  // Jika cache masih valid, gunakan data dari cache
  if (newsCache.data && now - newsCache.timestamp < CACHE_DURATION) {
    return newsCache.data;
  }

  // Jika cache tidak valid, ambil data baru
  try {
    const freshNews = await fetchFunction();

    // Update cache
    newsCache = {
      data: freshNews,
      timestamp: now,
    };

    return freshNews;
  } catch (error) {
    console.error("Error fetching news for cache:", error);

    // Jika ada kesalahan dan cache ada, kembalikan cache lama
    if (newsCache.data) {
      return newsCache.data;
    }

    // Jika tidak ada cache, kembalikan array kosong
    return [];
  }
};
