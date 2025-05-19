"use client";

import Link from "next/link";

export default function NewsCard({ news }) {
  const hasLink = news.link && typeof news.link === "string";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Gambar */}
      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Konten */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-blue-600 font-semibold uppercase mb-1">
          {news.category || "general"}
        </span>

        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {news.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
          {news.description}
        </p>

        <div className="mt-4">
          {hasLink ? (
            <Link
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline font-medium text-sm"
            >
              Baca selengkapnya →
            </Link>
          ) : (
            <span className="text-sm text-gray-400 italic">Link tidak tersedia</span>
          )}
        </div>
      </div>
    </div>
  );
}
