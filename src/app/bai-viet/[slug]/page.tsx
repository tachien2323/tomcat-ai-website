"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Sparkles } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const { config } = useSiteConfig();

  const article = config.articles.find((a) => a.slug === params?.slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold">Không tìm thấy bài viết</h1>
        <p className="text-sm theme-text-muted">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã được ẩn từ trang quản trị.
        </p>
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/bai-viet"
        className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại Kho Bài Viết & Playbook
      </Link>

      <article className="theme-surface border rounded-3xl overflow-hidden shadow-2xl">
        <div
          className={`p-6 sm:p-10 bg-gradient-to-r ${article.coverGradient} space-y-4 text-white`}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full font-bold bg-orange-500 text-white">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-200">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-200">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <div className="prose prose-invert max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
            {article.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="text-xl sm:text-2xl font-extrabold text-orange-400 pt-4"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-lg sm:text-xl font-bold text-blue-400 pt-2"
                  >
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={idx} className="whitespace-pre-line leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          <div className="pt-6 border-t theme-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/70 text-blue-200 border border-blue-800/60"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Khám phá Bộ Skills liên quan
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
