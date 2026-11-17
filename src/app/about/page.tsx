"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Briefcase,
  Code2,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { keepViCompounds } from "@/utils/viText";

const COMP_ICONS = [Cpu, Code2, Briefcase, GraduationCap];

export default function AboutPage() {
  const { config } = useSiteConfig();
  const { brand, services } = config;

  const coreCompetencies = config.competencies || [
    {
      id: "comp-1",
      title: "Kiến Trúc AI Agent & MCP",
      items: [
        "Thiết kế hệ thống Đa tác tử (Multi-Agent) tự hành",
        "Kết nối Model Context Protocol (MCP) với Google Workspace, CRM, SQL",
        "Xây dựng RAG Chatbot nội bộ đọc hiểu hàng ngàn tài liệu doanh nghiệp",
      ],
    },
    {
      id: "comp-2",
      title: "Vibe Coding & Phát Triển Sản Phẩm Số",
      items: [
        "Xây dựng Website, Cổng thông tin & Web App bằng Next.js, TypeScript",
        "Làm chủ Claude Code, Google Antigravity, Cursor tối ưu tốc độ x10",
        "Triển khai CI/CD tự động hóa qua GitHub & Vercel Production",
      ],
    },
    {
      id: "comp-3",
      title: "Tự Động Hóa Quy Trình Doanh Nghiệp",
      items: [
        "Tích hợp n8n, Make, Webhook tự động hóa Marketing & Chăm sóc khách hàng",
        "Xây dựng hệ thống Content Machine nhân bản nội dung đa kênh",
        "Tự động hóa sản xuất Video AI, Nhân bản giọng nói & Avatar",
      ],
    },
    {
      id: "comp-4",
      title: "Đào Tạo & Chuyển Giao Tư Duy AI",
      items: [
        "Đào tạo AI In-house thực chiến cho các phòng ban doanh nghiệp",
        "Coaching 1-1 cho lãnh đạo, chuyên gia và chủ doanh nghiệp nhỏ",
        "Đóng gói thư viện Prompt, Skills & SOP chuẩn hóa dễ áp dụng",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Profile Card */}
      <div className="theme-surface border rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 relative">
        <div className="lg:col-span-5 relative min-h-[340px] bg-gradient-to-br from-blue-950 via-slate-950 to-orange-950 p-8 flex flex-col justify-end">
          <img
            src={brand.speakerImageUrl}
            alt={brand.brandName}
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/50 to-transparent" />
          <div className="relative z-10 space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-600 text-white">
              HỒ SƠ NĂNG LỰC CHUYÊN GIA
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {brand.brandName}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 font-medium">
              {brand.roleTitle}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
            <Sparkles className="w-4 h-4" />
            <span>SỨ MỆNH & TRIẾT LÝ HOẠT ĐỘNG</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/60 border border-orange-500/40 text-sm font-semibold text-orange-300 italic">
            {brand.motto}
          </div>

          {brand.bioParagraphs.map((p, idx) => (
            <p key={idx} className="text-sm sm:text-base theme-text-muted leading-relaxed">
              {p}
            </p>
          ))}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {brand.stats.map((st, i) => (
              <div key={i} className="p-3.5 rounded-2xl theme-elevated border text-center">
                <div className="text-xl font-extrabold text-tomcat-blend">{st.value}</div>
                <div className="text-[11px] theme-text-muted mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core AI Competencies */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400">
            Core Competencies
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            <span className="whitespace-nowrap">Năng Lực Chuyên Môn &amp;</span>{" "}
            <span className="text-tomcat-blend whitespace-nowrap">Hệ Sinh Thái AI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreCompetencies.map((comp, idx) => {
            const Icon = COMP_ICONS[idx % COMP_ICONS.length];
            return (
              <div
                key={comp.id || idx}
                className="theme-surface border rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg hover:border-orange-500/70 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-tomcat-blend flex items-center justify-center text-slate-950 shadow-md">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                  {keepViCompounds(comp.title)}
                </h3>
                <ul className="space-y-2.5">
                  {comp.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-[#09152e] via-[#060c1a] to-[#211108] border border-orange-500/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sẵn Sàng Ứng Dụng AI Vào Doanh Nghiệp & Công Việc Của Bạn?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Khám phá {services.length} gói giải pháp đào tạo, tư vấn và tự động hóa của {brand.brandName} hoặc liên hệ trực tiếp để nhận tư vấn lộ trình phù hợp nhất.
          </p>
        </div>

        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shrink-0"
        >
          <span>Liên Hệ Hợp Tác Ngay</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
