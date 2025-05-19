"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";

export default function ClientLayout({ session, children }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </SessionProvider>
  );
}