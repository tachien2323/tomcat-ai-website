"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Search, Clock, Calendar, ChevronRight } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { keepViCompounds } from "@/utils/viText";

export default function BaiVietPage() {
  const { config } = useSiteConfig();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const enabledArticles = useMemo(
    () => config.articles.filter((a) => a.enabled),
    [config.articles]
  );

  const categories = useMemo(() => {
    const set = new Set(enabledArticles.map((a) => a.category));
    return ["Tất cả", ...Array.from(set)];
  }, [enabledArticles]);

  const filteredArticles = useMemo(() => {
    return enabledArticles.filter((a) => {
      const matchCat =
        selectedCategory === "Tất cả" || a.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [enabledArticles, selectedCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#081533] via-[#050811] to-[#1f1209] border border-blue-800/70 p-6 sm:p-10 space-y-4 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold">
          <FileText className="w-4 h-4" />
          <span>KNOWLEDGE BASE & PLAYBOOKS</span>
        </div>
        <h1 className="text-2xl sm:text-5xl font-extrabold text-white leading-tight">
          <span className="whitespace-nowrap">Bài Viết &amp; Playbook</span>{" "}
          <span className="text-tomcat-blend whitespace-nowrap">
            Ứng Dụng AI
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl text-balance">
          {keepViCompounds(
            `Chia sẻ kiến thức thực chiến, lộ trình AI Agent, kỹ thuật huấn luyện văn phong và các case study tự động hóa doanh nghiệp từ ${config.brand.brandName}.`
          )}
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm bài viết, chủ đề, từ khóa..."
            aria-label="Tìm kiếm bài viết"
            className="w-full pl-10 pr-4 py-3 rounded-xl theme-surface border text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/25"
                  : "theme-surface border hover:border-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => (
          <Link
            key={art.id}
            href={`/bai-viet/${art.slug}`}
            className="group theme-surface border rounded-3xl overflow-hidden flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
          >
            <div>
              <div
                className={`h-40 bg-gradient-to-r ${art.coverGradient} p-6 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-orange-300 backdrop-blur-sm">
                    {art.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-200">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {art.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded bg-white/15 text-white text-[11px] font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h2 className="text-base sm:text-xl font-extrabold group-hover:text-orange-400 transition leading-snug">
                  {keepViCompounds(art.title)}
                </h2>
                <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                  {keepViCompounds(art.summary)}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t theme-border flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 theme-text-muted">
                <Calendar className="w-3.5 h-3.5" />
                {art.publishedAt}
              </span>
              <span className="font-bold text-orange-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                Đọc bài viết <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
