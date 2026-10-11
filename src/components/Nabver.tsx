"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";

interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("ক্যাটাগরি লোড করা যায়নি");
        }

        const data = await response.json();

        
        setCategories(Array.isArray(data) ? data : data.data ?? []);
      } catch (error) {
        console.error("Category API Error:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    getCategories();
  }, []);

  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo and account links */}
        <div className="flex min-h-19 items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#05893E]">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={20}
                height={20}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                বাজার দর
              </h1>
              <p className="mt-1 text-xs text-gray-500">{banglaDate}</p>
            </div>
          </Link>

          <div className="hidden lg:flex"><UserInfo /></div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-xl text-gray-800 transition hover:bg-gray-100 lg:hidden"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop category navigation */}
        <nav className="hidden items-center gap-1 overflow-x-auto pb-3 lg:flex">
          <Link
            href="/"
            className="shrink-0 rounded-full bg-[#05893E] px-4 py-2 text-sm font-semibold text-white"
          >
            হোম
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="mr-1">{category.icon}</span>
              {category.nameBn}
            </Link>
          ))}

          {categoryLoading && (
            <span className="px-3 py-2 text-sm text-gray-400">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          )}
        </nav>

        {/* Mobile and tablet navigation */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-[#05893E] px-3 py-3 text-center text-sm font-semibold text-white"
              >
                হোম
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-gray-50 px-3 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.nameBn}
                </Link>
              ))}
            </nav>

            {categoryLoading && (
              <p className="mt-3 text-center text-sm text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
              </p>
            )}

            <div className="mt-4">
              <UserInfo />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
