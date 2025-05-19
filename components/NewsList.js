"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NewsCard from "./NewsCard";

export default function NewsList({ initialNews }) {
  const [news, setNews] = useState(initialNews);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mapping sumber mentah ke label ramah
  const sourceMap = {
    all: "Semua",
    detik: "Detik",
    kompas: "Kompas",
    republika: "Republika",
    "google-news": "Google News",
    "cna": "CNA",
    "cbc": "CBC",
    "bild": "Bild",
  };

  // Ambil semua sumber unik dari data berita
  const uniqueSources = Array.from(
    new Set(news.map((item) => normalizeSource(item.source)))
  );

  const availableFilters = ["all", ...uniqueSources];

  // Normalisasi nama sumber
  function normalizeSource(source) {
    return source.toLowerCase().replace(/[^a-z]/g, "-");
  }

  const filteredNews =
    filter === "all"
      ? news
      : news.filter((item) => normalizeSource(item.source) === filter);

  const refreshNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setNews(data);
      router.refresh();
    } catch (error) {
      console.error("Error refreshing news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Filter + Refresh */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((srcKey) => (
            <button
              key={srcKey}
              onClick={() => setFilter(srcKey)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === srcKey
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {sourceMap[srcKey] || srcKey}
            </button>
          ))}
        </div>

        <button
          onClick={refreshNews}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memuat...
            </>
          ) : (
            "Segarkan"
          )}
        </button>
      </div>

      {/* Berita */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            Tidak ada berita dari sumber ini.
          </p>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Lihat semua berita
            </button>
          )}
        </div>
      )}
    </div>
  );
}
