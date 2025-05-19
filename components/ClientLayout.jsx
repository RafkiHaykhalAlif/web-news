'use client';

import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </SessionProvider>
  );
}
