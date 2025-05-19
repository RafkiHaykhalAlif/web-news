import { NextResponse } from "next/server";
import { fetchNewsFromSources } from "@/utils/newsApis";
import { getCachedNews } from "@/utils/cache";

export async function GET() {
  try {
    // Gunakan cache untuk mengurangi API calls
    const news = await getCachedNews(fetchNewsFromSources);
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
