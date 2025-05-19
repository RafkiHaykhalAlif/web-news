"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut, FiUser, FiLogIn, FiHome } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 flex items-center space-x-2"
        >
          <FiHome className="text-xl" />
          <span>Website News</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            Home Page
          </Link>

          {loading ? (
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : session ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "user"}
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                )}
                <span className="text-sm text-gray-600 font-medium hidden sm:block">
                  {session.user.name}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition"
              >
                <FiLogOut />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition"
            >
              <FiLogIn />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
