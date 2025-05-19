import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portal Berita",
  description: "Portal berita menggunakan Next.js dan OAuth2",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-100`}>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
