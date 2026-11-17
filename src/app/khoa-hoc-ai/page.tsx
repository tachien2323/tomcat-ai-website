"use client";

import React from "react";
import { BookOpen, Play, CheckCircle2, Sparkles } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function KhoaHocAiPage() {
  const { config } = useSiteConfig();
  const enabledLevels = config.courseLevels.filter((l) => l.enabled);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#091632] via-[#050811] to-[#211208] border border-blue-800/70 p-6 sm:p-10 text-center space-y-4 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold">
          <BookOpen className="w-4 h-4" />
          <span>CHƯƠNG TRÌNH ĐÀO TẠO CỘNG ĐỒNG MIỄN PHÍ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          <span className="block">Làm Chủ AI Thực Chiến Từ Con Số 0</span>
          <span className="mt-1 block">
            Cùng{" "}
            <span className="text-tomcat-blend whitespace-nowrap">
              {config.brand.brandName}
            </span>
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto text-balance">
          Lộ trình 18 bài học chia theo 4 cấp độ từ Nhập môn Prompt Engineering, Thiết lập Không gian AI, Huấn luyện Văn phong đến Vibe Coding &amp; Tự động hóa Doanh nghiệp.
        </p>
      </div>

      {/* Levels List */}
      <div className="space-y-8">
        {enabledLevels.map((lvl) => (
          <div
            key={lvl.id}
            className="theme-surface border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b theme-border pb-5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lvl.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold">{lvl.title}</h2>
                <p className="text-xs sm:text-sm theme-text-muted">{lvl.subtitle}</p>
              </div>
              <div className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-950/70 text-blue-200 border border-blue-800/60 shrink-0">
                {lvl.lessonsCount} Bài học · {lvl.duration}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {lvl.lessons.map((ls, i) => (
                <a
                  key={i}
                  href={ls.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl theme-elevated border hover:border-orange-500 transition"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-600 text-white text-xs font-mono font-bold shrink-0">
                      {ls.number}
                    </span>
                    <span className="font-semibold text-sm group-hover:text-orange-400 transition">
                      {ls.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Miễn phí
                    </span>
                    <span className="font-mono theme-text-muted">{ls.duration}</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-800 group-hover:bg-orange-600 text-white font-bold transition">
                      <Play className="w-3 h-3 fill-current" />
                      Học ngay
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
