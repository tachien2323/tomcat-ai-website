"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  BookOpen,
  Wrench,
  Bot,
  Play,
  FileText,
  Users,
  Briefcase,
  Search,
  ArrowUpRight,
  Copy,
  Check,
  Star,
  GitFork,
  Terminal,
  Lock,
  Coffee,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Settings2,
  Send,
} from "lucide-react";
import { Github, Youtube, Facebook } from "@/components/BrandIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { SkillTemplateItem } from "@/types/site";
import { SkillDetailModal } from "@/components/SkillDetailModal";
import { keepViCompounds } from "@/utils/viText";

export default function HomePage() {
  const { config } = useSiteConfig();
  const {
    features,
    brand,
    services,
    aiTools,
    skills,
    repos,
    customGpts,
    videos,
    courseLevels,
    articles,
    communities,
    socialChannels,
  } = config;

  // AI Tools search & filter
  const [toolSearch, setToolSearch] = useState("");
  const [toolCategory, setToolCategory] = useState("Tất cả");
  const [showAllTools, setShowAllTools] = useState(false);

  // Skill Modal state
  const [selectedSkill, setSelectedSkill] = useState<SkillTemplateItem | null>(null);

  // Copy states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const enabledTools = useMemo(() => aiTools.filter((t) => t.enabled), [aiTools]);
  const toolCategories = useMemo(() => {
    const cats = Array.from(new Set(enabledTools.map((t) => t.category)));
    return ["Tất cả", ...cats];
  }, [enabledTools]);

  const filteredTools = useMemo(() => {
    return enabledTools.filter((tool) => {
      const matchCat = toolCategory === "Tất cả" || tool.category === toolCategory;
      const q = toolSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [enabledTools, toolCategory, toolSearch]);

  const displayedTools = showAllTools ? filteredTools : filteredTools.slice(0, 8);

  const enabledSkills = useMemo(() => skills.filter((s) => s.enabled), [skills]);
  const enabledRepos = useMemo(() => repos.filter((r) => r.enabled), [repos]);
  const enabledGpts = useMemo(() => customGpts.filter((g) => g.enabled), [customGpts]);
  const enabledVideos = useMemo(
    () => videos.filter((v) => v.enabled && !v.isMemberOnly),
    [videos]
  );
  const enabledMemberVideos = useMemo(
    () => videos.filter((v) => v.enabled && v.isMemberOnly),
    [videos]
  );
  const enabledCourses = useMemo(
    () => courseLevels.filter((c) => c.enabled),
    [courseLevels]
  );
  const enabledArticles = useMemo(() => articles.filter((a) => a.enabled), [articles]);
  const enabledServices = useMemo(() => services.filter((s) => s.enabled), [services]);
  const enabledCommunities = useMemo(
    () => communities.filter((c) => c.enabled),
    [communities]
  );
  const enabledChannels = useMemo(
    () => socialChannels.filter((s) => s.enabled),
    [socialChannels]
  );

  const featuredVideo = enabledVideos.find((v) => v.isFeatured) || enabledVideos[0];
  const gridVideos = enabledVideos.filter((v) => v.id !== featuredVideo?.id);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(brand.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyBank = async () => {
    await navigator.clipboard.writeText(brand.donationInfo.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-engineering-grid border-b border-[#1d315c] pt-12 pb-20">
        {/* Ambient Navy & Orange Glows */}
        <div className="pointer-events-none absolute -top-28 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-1/4 w-80 h-80 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          {/* Social Proof Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:py-1.5 rounded-2xl sm:rounded-full bg-[#0b1630]/90 border border-blue-700/60 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-blue-200 leading-snug">
              {brand.heroBadge.includes("·") ? (
                <>
                  <span className="block sm:inline whitespace-nowrap">
                    {brand.heroBadge.split("·")[0].trim()}
                  </span>
                  <span className="hidden sm:inline mx-1.5">·</span>
                  <span className="block sm:inline whitespace-nowrap">
                    {brand.heroBadge.split("·").slice(1).join("·").trim()}
                  </span>
                </>
              ) : (
                keepViCompounds(brand.heroBadge)
              )}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-balance">
            <span className="block">{keepViCompounds(brand.heroTitlePrefix)}</span>
            <span className="mt-2 block text-tomcat-blend whitespace-nowrap">
              {brand.heroTitleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg theme-text-muted leading-relaxed text-balance">
            {keepViCompounds(brand.heroSubtitle)}
          </p>

          {/* Key Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-2">
            {brand.stats.map((st, idx) => (
              <div
                key={idx}
                className="theme-surface border rounded-2xl p-4 shadow-md hover:border-orange-500/60 transition"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-tomcat-blend">
                  {st.value}
                </div>
                <div className="text-xs theme-text-muted font-medium mt-1">
                  {keepViCompounds(st.label)}
                </div>
              </div>
            ))}
          </div>

          {/* 9 Quick Access Pills (like phandonggiang.com) */}
          {features.heroQuickPills && (
            <div className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-3">
                Khám phá nhanh hệ sinh thái {brand.brandName}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
                {features.skillsHub && (
                  <Link
                    href="/skills"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/25 hover:scale-105 transition"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    Skills & AI Templates
                  </Link>
                )}
                {features.repoVault && (
                  <Link
                    href="/kho-repo"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-700/25 hover:scale-105 transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Kho GitHub Repo (1.000+)
                  </Link>
                )}
                {features.freeCourse && (
                  <Link
                    href="/khoa-hoc-ai"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold theme-surface border hover:border-orange-500 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    Khóa Học AI Miễn Phí
                  </Link>
                )}
                {features.aiTools && (
                  <a
                    href="#tools"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold theme-surface border hover:border-orange-500 transition"
                  >
                    <Wrench className="w-3.5 h-3.5 text-blue-400" />
                    Công Cụ AI Khuyên Dùng
                  </a>
                )}
                {features.customGpts && (
                  <a
                    href="#gpt-doc-quyen"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold theme-surface border hover:border-orange-500 transition"
                  >
                    <Bot className="w-3.5 h-3.5 text-orange-400" />
                    Bộ GPT & Agent Độc Quyền
                  </a>
                )}
                {features.latestVideos && (
                  <a
                    href="#videos"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold theme-surface border hover:border-orange-500 transition"
                  >
                    <Play className="w-3.5 h-3.5 text-red-400" />
                    Video Thực Chiến
                  </a>
                )}
                {features.articles && (
                  <Link
                    href="/bai-viet"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold theme-surface border hover:border-orange-500 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    Bài Viết & Playbook
                  </Link>
                )}
                {features.b2bServices && (
                  <a
                    href="#services"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold theme-surface border hover:border-orange-500 transition"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-orange-400" />
                    Giải Pháp Doanh Nghiệp (B2B)
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. ABOUT / SPEAKER HIGHLIGHT SECTION */}
      {features.aboutSection && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="theme-surface border rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Speaker Image Column */}
              <div className="lg:col-span-5 relative min-h-[320px] bg-gradient-to-br from-blue-950 via-slate-950 to-orange-950 flex flex-col justify-end p-6 sm:p-8 overflow-hidden">
                <img
                  src={brand.speakerImageUrl}
                  alt={brand.brandName}
                  className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-luminosity hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500 text-white">
                    Founder & AI Architect
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {brand.brandName}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-200 font-medium">
                    {brand.roleTitle}
                  </p>
                </div>
              </div>

              {/* Bio & Narrative Column */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-orange-950/40 border border-orange-500/40 text-xs sm:text-sm font-semibold text-orange-300 italic">
                    {brand.motto}
                  </div>

                  {brand.bioParagraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base theme-text-muted leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="pt-4 border-t theme-border flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                  <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
                    <a
                      href={brand.contact.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-md whitespace-nowrap"
                    >
                      <Youtube className="w-4 h-4 shrink-0" />
                      <span>YouTube</span>
                    </a>
                    <a
                      href={brand.contact.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition shadow-md whitespace-nowrap"
                    >
                      <Facebook className="w-4 h-4 shrink-0" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={brand.contact.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-[#0d1936] hover:bg-blue-900 text-white text-xs font-bold border border-blue-700/70 transition whitespace-nowrap"
                    >
                      <Github className="w-4 h-4 shrink-0" />
                      <span>GitHub</span>
                    </a>
                  </div>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/40 text-xs font-bold transition sm:ml-auto whitespace-nowrap"
                  >
                    <span>Xem hồ sơ năng lực chi tiết</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. B2B & B2C SERVICES / SOLUTIONS SECTION */}
      {features.b2bServices && enabledServices.length > 0 && (
        <section id="services" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400 border border-blue-500/30">
              Giải Pháp Cho Doanh Nghiệp &amp; Cá Nhân
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              <span className="block">
                <span className="whitespace-nowrap">Đồng Hành</span>{" "}
                <span className="whitespace-nowrap">Chuyển Đổi &amp;</span>{" "}
                <span className="whitespace-nowrap">Ứng Dụng</span>
              </span>
              <span className="mt-1 block text-tomcat-blend whitespace-nowrap">
                AI Thực Chiến
              </span>
            </h2>
            <p className="text-sm sm:text-base theme-text-muted max-w-2xl mx-auto text-balance">
              {keepViCompounds(
                "Thiết kế lộ trình đào tạo, xây dựng hệ thống AI Agent tự động hóa quy trình giúp doanh nghiệp và cá nhân bứt phá năng suất."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {enabledServices.map((srv) => (
              <div
                key={srv.id}
                className="theme-surface border rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-orange-500/70 transition shadow-lg group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-blue-200 border border-blue-700/60 whitespace-nowrap">
                      {keepViCompounds(srv.targetAudience)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-orange-500/20 text-orange-400 whitespace-nowrap shrink-0">
                      {keepViCompounds(srv.badge)}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold group-hover:text-orange-400 transition leading-snug">
                    {keepViCompounds(srv.title)}
                  </h3>

                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {keepViCompounds(srv.description)}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {srv.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t theme-border">
                  <a
                    href={srv.ctaLink}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-800 to-blue-700 group-hover:from-orange-600 group-hover:to-amber-500 text-white text-xs sm:text-sm font-bold transition shadow-md"
                  >
                    <span>{srv.ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. CURATED AI TOOLS DIRECTORY */}
      {features.aiTools && enabledTools.length > 0 && (
        <section id="tools" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
              AI Tools Directory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              <span className="whitespace-nowrap">Công Cụ AI</span>{" "}
              <span className="whitespace-nowrap">Tôi Sử Dụng &amp;</span>{" "}
              <span className="text-tomcat-blend whitespace-nowrap">
                Khuyên Dùng
              </span>
            </h2>
            <p className="text-sm sm:text-base theme-text-muted max-w-2xl mx-auto text-balance">
              {keepViCompounds(
                "Danh sách các công cụ AI tốt nhất phục vụ lập trình, sản xuất video, giọng nói, nghiên cứu và tự động hóa công việc hàng ngày."
              )}
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Tìm kiếm công cụ theo tên, nhu cầu..."
                aria-label="Tìm kiếm công cụ AI"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl theme-surface border text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {toolCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setToolCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                    toolCategory === cat
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/25"
                      : "theme-surface border hover:border-orange-500/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="group theme-surface border rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500 transition shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm text-slate-950 shadow-md bg-tomcat-blend">
                      {tool.iconText}
                    </div>
                    {tool.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-base group-hover:text-orange-400 transition flex items-center justify-between">
                      <span>{tool.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-orange-400 transition" />
                    </h3>
                    <span className="text-[11px] text-blue-400 font-medium">
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-xs theme-text-muted leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t theme-border flex items-center justify-between text-xs font-semibold text-orange-400">
                  <span>Truy cập công cụ</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>

          {filteredTools.length > 8 && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllTools((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl theme-surface border hover:border-orange-500 text-xs sm:text-sm font-bold transition cursor-pointer"
              >
                {showAllTools
                  ? "Thu gọn danh sách công cụ"
                  : `Xem tất cả ${filteredTools.length} công cụ AI`}
              </button>
            </div>
          )}
        </section>
      )}

      {/* 5. SKILLS & AI TEMPLATES SHOWCASE */}
      {features.skillsHub && enabledSkills.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#081229] via-[#050811] to-[#1f120b] border border-blue-800/70 p-6 sm:p-10 space-y-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[11px] sm:text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>THƯ VIỆN CLAUDE CODE, ANTIGRAVITY &amp; AI WORKFLOWS</span>
                </div>
                <h2 className="text-xl sm:text-4xl font-extrabold text-white leading-tight whitespace-nowrap">
                  AI{" "}
                  <span className="text-tomcat-blend">
                    TEMPLATES &amp; SKILLS
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300">
                  {keepViCompounds(
                    "Khám phá, sao chép và tích hợp ngay các bộ cấu hình Skills, Subagents, Prompts, MCPs và Workflows thực chiến cho dự án của bạn."
                  )}
                </p>
              </div>

              <Link
                href="/skills"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-600/30 transition shrink-0"
              >
                <span>Mở toàn bộ Thư viện Skills ({enabledSkills.length}+)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {enabledSkills.slice(0, 8).map((sk) => (
                <div
                  key={sk.id}
                  onClick={() => setSelectedSkill(sk)}
                  className="group cursor-pointer rounded-2xl bg-[#0b152c]/90 hover:bg-[#101f42] border border-blue-900/80 hover:border-orange-500/80 p-5 flex flex-col justify-between transition shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        {sk.tag}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400">
                        ↗ {sk.downloadsCount}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-mono font-bold text-base text-white group-hover:text-orange-400 transition">
                        {sk.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-200 mt-0.5 line-clamp-1">
                        {sk.titleVi}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {sk.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-blue-900/60 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-blue-300">{sk.category}</span>
                    <span className="font-bold text-orange-400 group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      Xem & Copy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CURATED GITHUB REPOS VAULT */}
      {features.repoVault && enabledRepos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
                <Github className="w-3.5 h-3.5" />
                <span>OPEN SOURCE AI DIRECTORY</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                <span className="whitespace-nowrap">Kho GitHub Repo</span>{" "}
                <span className="text-tomcat-blend whitespace-nowrap">
                  Hàng Đầu
                </span>
              </h2>
              <p className="text-sm sm:text-base theme-text-muted">
                {keepViCompounds(
                  "Tổng hợp các dự án mã nguồn mở tốt nhất về AI Agent, Vibe Coding, RAG, MCP và Tự động hóa."
                )}
              </p>
            </div>

            <Link
              href="/kho-repo"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition shrink-0 shadow-md"
            >
              <span>Khám phá toàn bộ Kho Repo</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enabledRepos.slice(0, 6).map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group theme-surface border rounded-2xl p-6 flex flex-col justify-between hover:border-orange-500 transition shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-900/60 text-blue-200 border border-blue-700/60">
                      {repo.topic}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-semibold text-amber-400">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {repo.stars}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono font-extrabold text-base group-hover:text-orange-400 transition">
                      {repo.owner}/{repo.name}
                    </h3>
                    <span className="text-[11px] text-blue-400 font-medium">
                      Ngôn ngữ: {repo.language}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t theme-border flex flex-wrap gap-1.5">
                  {repo.highlights.map((hl, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-200 text-[11px]"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 7. EXCLUSIVE CUSTOM GPTS & AI AGENTS */}
      {features.customGpts && enabledGpts.length > 0 && (
        <section id="gpt-doc-quyen" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Custom GPTs &amp; Specialized Agents
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              <span className="whitespace-nowrap">Bộ GPT &amp; Trợ Lý AI</span>{" "}
              <span className="text-tomcat-blend whitespace-nowrap">
                Độc Quyền
              </span>
            </h2>
            <p className="text-sm sm:text-base theme-text-muted">
              {keepViCompounds(
                `Các trợ lý AI đã được huấn luyện sẵn quy trình chuyên sâu của ${brand.brandName} cho Vibe Coding, Kịch bản Video, Tự động hóa và Nhân bản văn phong.`
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enabledGpts.map((gpt) => (
              <div
                key={gpt.id}
                className="theme-surface border rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-blue-200 whitespace-nowrap">
                      {keepViCompounds(gpt.category)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 whitespace-nowrap shrink-0">
                      {keepViCompounds(gpt.badge)}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-xl font-extrabold leading-snug">
                    {keepViCompounds(gpt.name)}
                  </h3>
                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {keepViCompounds(gpt.description)}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {gpt.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t theme-border flex flex-wrap items-center gap-3">
                  <a
                    href={gpt.accessUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-bold transition shadow-md"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Mở Trợ Lý GPT Ngay</span>
                  </a>
                  <a
                    href={gpt.demoVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl theme-elevated border text-xs font-semibold hover:border-orange-500 transition"
                  >
                    <Play className="w-3.5 h-3.5 text-orange-400" />
                    <span>Xem Video Hướng Dẫn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. LATEST VIDEOS SECTION */}
      {features.latestVideos && enabledVideos.length > 0 && (
        <section id="videos" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                Video Tutorials
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                <span className="whitespace-nowrap">Video Hướng Dẫn</span>{" "}
                <span className="text-tomcat-blend whitespace-nowrap">
                  Mới Nhất
                </span>
              </h2>
            </div>

            <a
              href={brand.contact.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shrink-0"
            >
              <Youtube className="w-4 h-4" />
              <span>Xem thêm trên YouTube</span>
            </a>
          </div>

          {/* Featured Video */}
          {featuredVideo && (
            <div className="theme-surface border rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
              <a
                href={featuredVideo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] bg-slate-950 group overflow-hidden block"
              >
                <img
                  src={featuredVideo.thumbnailUrl}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-orange-600 group-hover:bg-orange-500 text-white flex items-center justify-center shadow-2xl shadow-orange-600/50 group-hover:scale-110 transition">
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-black/80 text-white text-xs font-mono font-bold">
                  {featuredVideo.duration}
                </span>
              </a>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400">
                      Tiêu điểm · {featuredVideo.category}
                    </span>
                    <span className="text-xs theme-text-muted">{featuredVideo.views}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold leading-snug">
                    {keepViCompounds(featuredVideo.title)}
                  </h3>
                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {keepViCompounds(featuredVideo.description)}
                  </p>
                </div>

                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-110 transition"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Xem Video Ngay</span>
                </a>
              </div>
            </div>
          )}

          {/* Grid Videos */}
          {gridVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {gridVideos.map((vid) => (
                <a
                  key={vid.id}
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group theme-surface border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-orange-500 transition shadow-md"
                >
                  <div className="relative h-44 bg-slate-950 overflow-hidden">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono">
                      {vid.duration}
                    </span>
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-blue-900/90 text-blue-100 text-[10px] font-bold">
                      {vid.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-sm line-clamp-2 group-hover:text-orange-400 transition leading-snug">
                      {keepViCompounds(vid.title)}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] theme-text-muted pt-2 border-t theme-border">
                      <span>{keepViCompounds(vid.views)}</span>
                      <span>{keepViCompounds(vid.publishedAt)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 9. FREE AI COURSE (4 LEVELS - 18 LESSONS) */}
      {features.freeCourse && enabledCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              100% Miễn Phí · Học Từ Con Số 0
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              <span className="whitespace-nowrap">Khóa Học</span>{" "}
              <span className="whitespace-nowrap">AI Thực Chiến</span>{" "}
              <span className="text-tomcat-blend whitespace-nowrap">
                4 Cấp Độ
              </span>
            </h2>
            <p className="text-sm sm:text-base theme-text-muted max-w-2xl mx-auto text-balance">
              {keepViCompounds(
                "18 bài học được thiết kế bài bản giúp bạn làm chủ tư duy Prompt, thiết lập không gian làm việc AI, huấn luyện văn phong và tự động hóa công việc."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enabledCourses.map((lvl) => (
              <div
                key={lvl.id}
                className="theme-surface border rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 whitespace-nowrap">
                      {keepViCompounds(lvl.badge)}
                    </span>
                    <span className="text-xs font-semibold text-blue-400 whitespace-nowrap">
                      {lvl.lessonsCount} bài học · {lvl.duration}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                    {keepViCompounds(lvl.title)}
                  </h3>
                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {keepViCompounds(lvl.subtitle)}
                  </p>

                  <div className="space-y-2 pt-2">
                    {lvl.lessons.slice(0, 3).map((ls, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl theme-elevated text-xs"
                      >
                        <span className="truncate font-medium">
                          <strong className="text-orange-400 mr-1.5">{ls.number}:</strong>
                          {ls.title}
                        </span>
                        <span className="font-mono text-[11px] theme-text-muted shrink-0">
                          {ls.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t theme-border flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-bold">Mở khóa miễn phí</span>
                  <Link
                    href="/khoa-hoc-ai"
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300"
                  >
                    <span>Xem trọn bộ bài học</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. MEMBER-ONLY / DEEP DIVE VIDEOS */}
      {features.memberVideos && enabledMemberVideos.length > 0 && (
        <section
          id="member-videos"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        >
          <div className="rounded-3xl bg-gradient-to-r from-[#09152e] via-[#0c1b3a] to-[#1e120a] border border-orange-500/40 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>CHUYÊN SÂU & HỘI VIÊN PRO</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Video Case Study & Hệ Thống AI Nâng Cao
                </h2>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition shrink-0"
              >
                <span>Đăng ký nhận quyền truy cập</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {enabledMemberVideos.map((mv) => (
                <div
                  key={mv.id}
                  className="rounded-2xl bg-[#060c1a]/90 border border-blue-800/70 p-5 flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                    <img
                      src={mv.thumbnailUrl}
                      alt={mv.title}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-orange-600 text-white text-[10px] font-bold">
                      PRO
                    </span>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                      {mv.duration}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-white leading-snug">{mv.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{mv.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. FEATURED ARTICLES & PLAYBOOKS */}
      {features.articles && enabledArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400 border border-blue-500/30">
                Articles & Playbooks
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                <span className="whitespace-nowrap">Bài Viết &amp;</span>{" "}
                <span className="whitespace-nowrap">Hướng Dẫn</span>{" "}
                <span className="text-tomcat-blend whitespace-nowrap">
                  Chuyên Sâu
                </span>
              </h2>
            </div>

            <Link
              href="/bai-viet"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl theme-surface border hover:border-orange-500 text-xs font-bold transition shrink-0"
            >
              <span>Xem tất cả bài viết</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enabledArticles.map((art) => (
              <Link
                key={art.id}
                href={`/bai-viet/${art.slug}`}
                className="group theme-surface border rounded-3xl overflow-hidden flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
              >
                <div>
                  <div
                    className={`h-36 bg-gradient-to-r ${art.coverGradient} p-6 flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-orange-300 backdrop-blur-sm">
                        {art.category}
                      </span>
                      <span className="text-xs text-slate-200 font-medium">
                        {art.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {art.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-semibold"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base sm:text-xl font-extrabold group-hover:text-orange-400 transition leading-snug">
                      {keepViCompounds(art.title)}
                    </h3>
                    <p className="text-xs sm:text-sm theme-text-muted leading-relaxed line-clamp-3">
                      {keepViCompounds(art.summary)}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t theme-border flex items-center justify-between text-xs">
                  <span className="theme-text-muted">Ngày đăng: {art.publishedAt}</span>
                  <span className="font-bold text-orange-400 group-hover:translate-x-1 transition inline-flex items-center gap-1">
                    Đọc chi tiết →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 12. COMMUNITIES & OMNICHANNEL PRESENCE */}
      {(features.community || features.omnichannel) && (
        <section id="community" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {features.community && enabledCommunities.length > 0 && (
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400">
                  Community
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  <span className="whitespace-nowrap">Tham Gia Cộng Đồng</span>{" "}
                  <span className="text-tomcat-blend whitespace-nowrap">
                    {brand.brandName}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enabledCommunities.map((com) => (
                  <a
                    key={com.id}
                    href={com.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group theme-surface border rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-blue-200 whitespace-nowrap">
                          {com.platform}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 whitespace-nowrap shrink-0">
                          {keepViCompounds(com.membersCount)}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold group-hover:text-orange-400 transition leading-snug">
                        {keepViCompounds(com.name)}
                      </h3>
                      <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                        {keepViCompounds(com.description)}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t theme-border flex items-center justify-between text-xs font-bold text-orange-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        Tham gia cộng đồng miễn phí
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {features.omnichannel && enabledChannels.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-center">
                Kết Nối Đa Kênh Cùng {brand.brandName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enabledChannels.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group theme-surface border rounded-2xl p-5 hover:border-orange-500 transition flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm group-hover:text-orange-400 transition">
                          {ch.platform}
                        </span>
                        <span className="text-xs font-bold text-blue-400">
                          {ch.followers}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-orange-400">{ch.handle}</p>
                      <p className="text-xs theme-text-muted">{ch.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 13. DONATION / BUY ME A COFFEE SECTION */}
      {features.donation && (
        <section id="donate" className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#0b162f] via-[#070d1c] to-[#1f1108] border border-orange-500/40 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>ỦNG HỘ {brand.brandName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Mời {brand.brandName} 1 Ly Cafe Sáng
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {brand.donationInfo.note}
                </p>

                <div className="p-4 rounded-2xl bg-[#050914] border border-blue-900/80 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Ngân hàng:</span>
                    <span className="font-bold text-white">{brand.donationInfo.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Số tài khoản:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-orange-400">
                        {brand.donationInfo.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyBank}
                        className="px-2 py-1 rounded bg-blue-900/70 hover:bg-orange-600 text-white text-[11px] font-semibold transition cursor-pointer"
                      >
                        {copiedBank ? "Đã Copy" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Chủ tài khoản:</span>
                    <span className="font-bold text-blue-300">
                      {brand.donationInfo.accountHolder}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="p-4 rounded-2xl bg-white shadow-xl">
                  <img
                    src={brand.donationInfo.qrImageUrl}
                    alt="Mã QR Ủng hộ Cafe"
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <span className="text-xs text-slate-400 mt-2">
                  Quét mã VietQR để ủng hộ nhanh
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 14. CONTACT & CONSULTATION SECTION */}
      {features.contactSection && (
        <section id="contact" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="theme-surface border rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400">
                  Contact & B2B Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  Liên Hệ Hợp Tác Cùng {brand.brandName}
                </h2>
                <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                  Dành cho Doanh nghiệp và Cá nhân có nhu cầu Đào tạo AI In-house, Tư vấn xây dựng hệ thống AI Automation hoặc hợp tác truyền thông.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3.5 rounded-2xl theme-elevated border">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                    <div>
                      <div className="text-[11px] theme-text-muted">Email công việc</div>
                      <div className="font-bold">{brand.contact.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? "Đã chép" : "Copy"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl theme-elevated border">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-[11px] theme-text-muted">Hotline / Zalo Tư vấn</div>
                      <div className="font-bold">{brand.contact.phone}</div>
                    </div>
                  </div>
                  <a
                    href={brand.contact.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition"
                  >
                    Nhắn Zalo
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl theme-elevated border">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <div>
                    <div className="text-[11px] theme-text-muted">Địa điểm làm việc</div>
                    <div className="font-bold">{brand.contact.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className="p-6 rounded-2xl theme-elevated border space-y-4"
              >
                <h3 className="font-extrabold text-base">
                  Gửi yêu cầu Tư vấn / Hợp tác nhanh
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      Họ và tên / Doanh nghiệp *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nhập tên của bạn hoặc công ty..."
                      className="w-full px-3.5 py-2.5 rounded-xl theme-surface border text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      Email hoặc Số điện thoại/Zalo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0909 xxx xxx / email@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl theme-surface border text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Nhu cầu quan tâm
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl theme-surface border text-xs sm:text-sm focus:outline-none focus:border-orange-500">
                    <option>Đào tạo AI In-house cho Doanh nghiệp</option>
                    <option>Tư vấn & Xây dựng Hệ thống AI Automation / Agent</option>
                    <option>Coaching 1-1 & Vibe Coding Xây dựng Website/App</option>
                    <option>Mua trọn bộ Skills & AI Templates</option>
                    <option>Hợp tác truyền thông / Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Nội dung chi tiết
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả ngắn gọn bài toán hoặc mục tiêu ứng dụng AI của bạn..."
                    className="w-full px-3.5 py-2.5 rounded-xl theme-surface border text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  {contactSubmitted ? (
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Đã ghi nhận thông tin! {brand.brandName} sẽ phản hồi bạn sớm nhất.
                    </div>
                  ) : (
                    <span className="text-[11px] theme-text-muted">
                      Cam kết bảo mật thông tin 100%.
                    </span>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-600/25 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Yêu Cầu Ngay</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Skill Detail Native Dialog Modal */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
