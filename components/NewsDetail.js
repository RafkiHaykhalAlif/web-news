"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NewsDetail({ news }) {
  const [imgError, setImgError] = useState(false);

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Berita tidak ditemukan</p>
        <Link href="/" className="mt-4 text-blue-600 hover:text-blue-800">
          &larr; Kembali ke beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        &larr; Kembali ke beranda
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          {!imgError ? (
            <Image
              src={news.normalizedImageUrl}
              alt={news.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Gambar tidak tersedia</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              {news.source}
            </span>
            <span className="text-gray-600 text-sm">{news.formattedDate}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            {news.title}
          </h1>

          <div className="prose max-w-none text-black">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Sumber:{" "}
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {news.source}
              </a>
            </p>
          </div>

          {news.category && (
            <div className="mt-3">
              <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                Kategori: {news.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
