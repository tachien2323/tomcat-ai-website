"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ArrowUpRight,
  Bot,
  Box,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FileCode2,
  Puzzle,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { SkillDetailModal, SkillModalData } from "@/components/SkillDetailModal";
import { keepViCompounds } from "@/utils/viText";
import skillsCatalogJson from "@/data/skillsCatalog.json";

interface CatalogTypeDef {
  id: string;
  singular: string;
  slug: string;
  flag: string;
  ghMode: string;
  count: number;
  categories: string[];
}

interface CatalogSkillItem {
  id: string;
  name: string;
  type: string;
  typeSingular: string;
  category: string;
  downloads: string;
  downloadsNum: number;
  description: string;
  source?: string;
  // Present only on custom items added via /admin
  titleVi?: string;
  installCommand?: string;
  promptContent?: string;
  useCase?: string;
  level?: string;
}

interface TrendingPick {
  rank: string;
  name: string;
  category: string;
  weeklyCount: string;
  itemId: string | null;
  type: string;
}

interface EcosystemJob {
  id: string;
  badge: string;
  title: string;
  company: string;
  location: string;
  url: string;
}

type SortKey = "popular" | "name";

const PAGE_SIZE = 24;

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Skills: Sparkles,
  Agents: Bot,
  Commands: Terminal,
  MCPs: Cpu,
  Plugins: Puzzle,
  Hooks: Zap,
  Settings: Settings,
  Loops: RefreshCw,
  Mods: Sliders,
  Sandbox: Box,
  Templates: FileCode2,
};

const ADMIN_CATEGORY_TO_TYPE: Record<string, string> = {
  Skills: "Skills",
  Agents: "Agents",
  Commands: "Commands",
  MCPs: "MCPs",
  Templates: "Templates",
  Prompts: "Skills",
  Workflows: "Loops",
};

function slugify(str: string): string {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function parseDownloads(str: string): number {
  return parseInt(String(str || "").replace(/[^\d]/g, ""), 10) || 0;
}

/** Renders a template slug with soft break points after - _ . so it never splits mid-word. */
function SoftBreak({ text }: { text: string }) {
  const parts = text.split(/([-_.])/);
  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {p}
          {/^[-_.]$/.test(p) ? <wbr /> : null}
        </React.Fragment>
      ))}
    </>
  );
}

function buildInstallCommand(item: CatalogSkillItem, typeDef?: CatalogTypeDef): string {
  if (item.installCommand) return item.installCommand;
  const flag = typeDef?.flag || "--skill";
  const catSlug = slugify(item.category) || "general";
  return `npx claude-code-templates@latest ${flag} ${catSlug}/${item.name} --yes`;
}

function buildGithubUrl(item: CatalogSkillItem, typeDef?: CatalogTypeDef): string {
  const typeSlug = typeDef?.slug || "skills";
  const catSlug = slugify(item.category) || "general";
  const base = "https://github.com/davila7/claude-code-templates";
  if (typeDef?.ghMode === "blob-md") {
    return `${base}/blob/main/cli-tool/components/${typeSlug}/${catSlug}/${item.name}.md`;
  }
  if (typeDef?.ghMode === "blob-json") {
    return `${base}/blob/main/cli-tool/components/${typeSlug}/${catSlug}/${item.name}.json`;
  }
  return `${base}/tree/main/cli-tool/components/${typeSlug}/${catSlug}/${item.name}`;
}

function SkillsInner() {
  const { config } = useSiteConfig();
  const searchParams = useSearchParams();
  const listTopRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const types = skillsCatalogJson.types as CatalogTypeDef[];
  const typeById = useMemo(() => new Map(types.map((t) => [t.id, t])), [types]);
  const trending = skillsCatalogJson.trending as TrendingPick[];
  const jobs = skillsCatalogJson.jobs as EcosystemJob[];
  const allJobsUrl = skillsCatalogJson.allJobsUrl as string;

  // Base catalog (2,055 items) + any custom skills added by hand in /admin ("sk-<timestamp>")
  const allItems = useMemo<CatalogSkillItem[]>(() => {
    const base = skillsCatalogJson.items as CatalogSkillItem[];
    const known = new Set(base.map((i) => `${i.type}|${i.category}|${i.name}`.toLowerCase()));
    const extras: CatalogSkillItem[] = [];

    for (const sk of config.skills) {
      if (!sk.enabled) continue;
      if (!/^sk-\d{10,}$/.test(sk.id)) continue;
      const mappedType = ADMIN_CATEGORY_TO_TYPE[sk.category] || "Skills";
      const typeDef = typeById.get(mappedType);
      const cat = sk.tag || "General";
      const key = `${mappedType}|${cat}|${sk.name}`.toLowerCase();
      if (known.has(key)) continue;
      known.add(key);
      extras.push({
        id: sk.id,
        name: sk.name,
        titleVi: sk.titleVi,
        type: mappedType,
        typeSingular: typeDef?.singular || "Skill",
        category: cat,
        downloads: sk.downloadsCount || "1",
        downloadsNum: parseDownloads(sk.downloadsCount || "1"),
        description: sk.description,
        installCommand: sk.installCommand,
        promptContent: sk.promptContent,
        useCase: sk.useCase,
        level: sk.level,
      });
    }

    return [...extras, ...base];
  }, [config.skills, typeById]);

  const itemById = useMemo(
    () => new Map(allItems.map((i) => [i.id, i])),
    [allItems]
  );

  const [activeType, setActiveType] = useState<string>("Skills");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [page, setPage] = useState<number>(1);
  const [selectedModal, setSelectedModal] = useState<SkillModalData | null>(null);

  // Sync ?loai= from URL
  useEffect(() => {
    const param = searchParams.get("loai");
    if (!param) return;
    const found = types.find(
      (t) =>
        t.slug.toLowerCase() === param.toLowerCase() ||
        t.id.toLowerCase() === param.toLowerCase()
    );
    if (found) setActiveType(found.id);
  }, [searchParams, types]);

  // Ctrl/⌘ + K focuses search input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of allItems) {
      counts[item.type] = (counts[item.type] || 0) + 1;
    }
    return counts;
  }, [allItems]);

  const typeItems = useMemo(
    () => allItems.filter((i) => i.type === activeType),
    [allItems, activeType]
  );

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of typeItems) {
      counts.set(item.category, (counts.get(item.category) || 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [typeItems]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    let list = typeItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        normalize(item.name).includes(q) ||
        normalize(item.description).includes(q) ||
        normalize(item.category).includes(q) ||
        (item.source ? normalize(item.source).includes(q) : false) ||
        (item.titleVi ? normalize(item.titleVi).includes(q) : false)
      );
    });

    list = [...list];
    if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => b.downloadsNum - a.downloadsNum);
    }
    return list;
  }, [typeItems, category, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const hasFilter =
    category !== "all" || query.trim() !== "" || sort !== "popular";

  const selectType = (typeId: string) => {
    setActiveType(typeId);
    setCategory("all");
    setPage(1);
    const t = typeById.get(typeId);
    try {
      const url = t && t.slug !== "skills" ? `/skills?loai=${t.slug}` : "/skills";
      window.history.replaceState(null, "", url);
    } catch {
      // ignore
    }
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("popular");
    setPage(1);
  };

  const goPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), pageCount));
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openItemModal = (item: CatalogSkillItem) => {
    const typeDef = typeById.get(item.type);
    setSelectedModal({
      id: item.id,
      name: item.name,
      titleVi: item.titleVi,
      category: item.type,
      tag: item.category,
      level: item.level,
      downloadsCount: item.downloads,
      description: item.description,
      installCommand: buildInstallCommand(item, typeDef),
      promptContent: item.promptContent,
      useCase: item.useCase,
      githubUrl: item.promptContent ? undefined : buildGithubUrl(item, typeDef),
      source: item.source,
    });
  };

  const openTrendingPick = (pick: TrendingPick) => {
    const found =
      (pick.itemId ? itemById.get(pick.itemId) : undefined) ||
      allItems.find((i) => i.name === pick.name);
    if (found) openItemModal(found);
  };

  const selectClass =
    "w-full theme-surface border rounded-xl pl-10 pr-3 py-3 text-sm font-medium focus:outline-none focus:border-orange-500 cursor-pointer";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-6">
      {/* Top bar — consistent with /kho-repo */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-tomcat-blend text-slate-950 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="text-lg font-extrabold">
            AI <span className="text-tomcat-blend">Templates</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#dang-duoc-quan-tam"
            onClick={scrollToId("dang-duoc-quan-tam")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl theme-surface border hover:border-orange-500 text-xs sm:text-sm font-bold transition whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-orange-400" />
            Đang được quan tâm
          </a>
          <a
            href="#co-hoi-nghe-nghiep"
            onClick={scrollToId("co-hoi-nghe-nghiep")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl theme-surface border hover:border-orange-500 text-xs sm:text-sm font-bold transition whitespace-nowrap"
          >
            <Briefcase className="w-4 h-4 text-orange-400" />
            Cơ hội nghề nghiệp
          </a>
          <Link
            href="/kho-repo"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs sm:text-sm font-bold shadow-md whitespace-nowrap"
          >
            Kho Repo
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)] gap-6 items-start">
        {/* Sidebar (desktop) */}
        <aside
          aria-label="Thư viện AI Templates"
          className="hidden lg:block theme-surface border rounded-2xl p-3 sticky top-36 max-h-[calc(100vh-16rem)] overflow-y-auto"
        >
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-orange-400">
            THƯ VIỆN
          </div>

          <div className="space-y-0.5">
            {types.map((t) => {
              const Icon = TYPE_ICONS[t.id] || Sparkles;
              const active = activeType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectType(t.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold transition cursor-pointer ${
                    active
                      ? "bg-orange-600/20 text-orange-400 border border-orange-500/50"
                      : "theme-text-muted hover:bg-blue-950/40 border border-transparent"
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? "text-orange-400" : "text-blue-400"
                      }`}
                    />
                    <span className="truncate">{t.id}</span>
                  </span>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-full bg-blue-950/70 text-blue-200 shrink-0">
                    {typeCounts[t.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="my-3.5 border-t theme-border" />

          <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-orange-400">
            KHÁM PHÁ
          </div>
          <div className="space-y-0.5">
            <a
              href="#dang-duoc-quan-tam"
              onClick={scrollToId("dang-duoc-quan-tam")}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold theme-text-muted hover:bg-blue-950/40 transition"
            >
              <TrendingUp className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Đang thịnh hành</span>
            </a>
            <a
              href="#co-hoi-nghe-nghiep"
              onClick={scrollToId("co-hoi-nghe-nghiep")}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold theme-text-muted hover:bg-blue-950/40 transition"
            >
              <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Cơ hội nghề nghiệp</span>
            </a>
          </div>

          <div className="mt-4 px-3 pt-3 border-t theme-border flex items-center justify-between gap-2 text-[11px] theme-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Cập nhật thư viện nguồn
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-200 font-mono text-[10px] border border-blue-800/60">
              MIT
            </span>
          </div>
        </aside>

        {/* Main column */}
        <div className="space-y-8 min-w-0">
          {/* Mobile type picker — single native arrow */}
          <div className="lg:hidden">
            <select
              aria-label="Chọn loại AI Template"
              value={activeType}
              onChange={(e) => selectType(e.target.value)}
              className="w-full theme-surface border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} ({typeCounts[t.id] || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Hero */}
          <div className="rounded-3xl bg-gradient-to-br from-[#081533] via-[#050811] to-[#1d1109] border border-blue-800/70 p-6 sm:p-9 space-y-4 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-400 leading-snug">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>
                <span className="block sm:inline whitespace-nowrap">
                  THƯ VIỆN CLAUDE CODE, ANTIGRAVITY
                </span>
                <span className="block sm:inline whitespace-nowrap sm:ml-1">
                  &amp; CHATGPT CODEX
                </span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight whitespace-nowrap">
              AI <span className="text-tomcat-blend">TEMPLATES</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl text-balance">
              {keepViCompounds(
                `Khám phá, chọn và kết hợp các cấu hình AI hữu ích cho dự án của bạn, được tổng hợp và phân loại bởi ${config.brand.brandName}.`
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-2xl">
              {[
                { v: allItems.length.toLocaleString("vi-VN"), l: "Templates", span: "" },
                { v: String(types.length), l: "Loại công cụ", span: "" },
                { v: "Mã nguồn mở", l: "Sẵn sàng sử dụng", span: "col-span-2 sm:col-span-1" },
              ].map((s) => (
                <div
                  key={s.l}
                  className={`rounded-2xl bg-[#0b1630]/80 border border-blue-800/60 px-3.5 py-3 ${s.span}`}
                >
                  <div className="text-lg sm:text-2xl font-extrabold text-tomcat-blend leading-tight">
                    {s.v}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                    {keepViCompounds(s.l)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* List header + filters */}
          <div ref={listTopRef} id="danh-sach-templates" className="scroll-mt-28 space-y-4">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
                BROWSE LIBRARY
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight">
                {activeType}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px_190px] gap-3">
              {/* Search box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Tìm theo tên, mô tả, danh mục..."
                  aria-label="Tìm kiếm AI Templates và Skills"
                  className="w-full pl-10 pr-16 py-3 rounded-xl theme-surface border text-sm focus:outline-none focus:border-orange-500"
                />
                <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 text-[10px] font-mono border border-blue-800/60">
                  Ctrl K
                </kbd>
              </div>

              {/* Category filter — single native arrow */}
              <div className="relative">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Lọc theo danh mục"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                >
                  <option value="all">Tất cả danh mục</option>
                  {categoryOptions.map(([cat, n]) => (
                    <option key={cat} value={cat}>
                      {cat} ({n})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort select — single native arrow */}
              <div className="relative">
                <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Sắp xếp"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey);
                    setPage(1);
                  }}
                  className={selectClass}
                >
                  <option value="popular">Phổ biến</option>
                  <option value="name">Tên A–Z</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm theme-text-muted">
              <div className="inline-flex items-center gap-3">
                <span>
                  <strong className="text-orange-400">
                    {filtered.length.toLocaleString("vi-VN")}
                  </strong>{" "}
                  kết quả
                </span>
                {hasFilter && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Xóa bộ lọc
                  </button>
                )}
              </div>
              <span>
                {activeType} · Trang {safePage} / {pageCount}
              </span>
            </div>
          </div>

          {/* Cards grid */}
          {pageItems.length === 0 ? (
            <div className="theme-surface border rounded-2xl p-10 text-center space-y-2">
              <div className="text-lg font-extrabold">
                Không tìm thấy template phù hợp
              </div>
              <p className="text-sm theme-text-muted">
                Hãy thử từ khóa khác hoặc bấm &ldquo;Xóa bộ lọc&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {pageItems.map((item) => {
                const TypeIcon = TYPE_ICONS[item.type] || Sparkles;
                return (
                  <article
                    key={item.id}
                    className="group theme-surface border rounded-2xl overflow-hidden flex flex-col hover:border-orange-500 transition shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => openItemModal(item)}
                      className="flex-1 flex flex-col text-left p-5 space-y-3 cursor-pointer"
                    >
                      <div className="w-full flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-900/60 text-blue-200 border border-blue-700/60 truncate max-w-[70%]">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 shrink-0">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {item.downloads}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-mono font-extrabold text-sm sm:text-base break-words leading-snug group-hover:text-orange-400 transition">
                          <SoftBreak text={item.name} />
                        </h3>
                        {item.titleVi && (
                          <p className="text-xs font-bold text-blue-400 leading-snug">
                            {keepViCompounds(item.titleVi)}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm theme-text-muted leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {item.source && (
                        <div className="pt-1 text-[11px] font-mono theme-text-muted truncate w-full">
                          {item.source}
                        </div>
                      )}
                    </button>

                    <div className="px-5 py-3 border-t theme-border flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 theme-text-muted">
                        <TypeIcon className="w-3.5 h-3.5 text-blue-400" />
                        {item.typeSingular}
                      </span>
                      <button
                        type="button"
                        onClick={() => openItemModal(item)}
                        className="inline-flex items-center gap-1 font-bold text-orange-400 hover:text-orange-300 cursor-pointer"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        Xem &amp; Cài đặt
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goPage(safePage - 1)}
                disabled={safePage <= 1}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl theme-surface border text-sm font-bold hover:border-orange-500 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Trước
              </button>
              <span className="text-sm font-bold px-2">
                {safePage} / {pageCount}
              </span>
              <button
                type="button"
                onClick={() => goPage(safePage + 1)}
                disabled={safePage >= pageCount}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl theme-surface border text-sm font-bold hover:border-orange-500 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Tiếp
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom 2-column highlight boxes — matching /kho-repo's 2-column style */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4">
            {/* Column 1: Đang được quan tâm */}
            <div id="dang-duoc-quan-tam" className="scroll-mt-28 space-y-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
                    COMMUNITY PICKS
                  </div>
                  <h2 className="mt-1 text-xl sm:text-2xl font-extrabold inline-flex items-center gap-2 leading-tight">
                    <TrendingUp className="w-5 h-5 text-orange-400 shrink-0" />
                    <span>{keepViCompounds("Đang được quan tâm")}</span>
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold theme-surface border theme-text-muted shrink-0">
                  Tuần này
                </span>
              </div>

              <div className="space-y-2.5">
                {trending.map((tr) => (
                  <button
                    key={`${tr.rank}-${tr.name}`}
                    type="button"
                    onClick={() => openTrendingPick(tr)}
                    className="w-full text-left group flex items-center gap-3 sm:gap-4 theme-surface border rounded-2xl p-3.5 sm:p-4 hover:border-orange-500 transition cursor-pointer"
                  >
                    <span className="w-9 text-center text-lg sm:text-xl font-extrabold text-tomcat-blend shrink-0">
                      {tr.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono font-bold text-sm sm:text-base truncate group-hover:text-orange-400 transition">
                        {tr.name}
                      </div>
                      <div className="text-xs theme-text-muted truncate">
                        {tr.category}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-400 shrink-0">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {tr.weeklyCount}
                    </span>
                    <ArrowUpRight className="w-4 h-4 theme-text-muted group-hover:text-orange-400 shrink-0 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Cơ hội nghề nghiệp */}
            <div id="co-hoi-nghe-nghiep" className="scroll-mt-28 space-y-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
                    CLAUDE ECOSYSTEM
                  </div>
                  <h2 className="mt-1 text-xl sm:text-2xl font-extrabold inline-flex items-center gap-2 leading-tight">
                    <Terminal className="w-5 h-5 text-orange-400 shrink-0" />
                    <span>{keepViCompounds("Cơ hội nghề nghiệp")}</span>
                  </h2>
                </div>
                <a
                  href={allJobsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-orange-400 hover:text-orange-300 shrink-0 transition"
                >
                  Xem tất cả
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-2.5">
                {jobs.map((job) => (
                  <a
                    key={job.id}
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 sm:gap-4 theme-surface border rounded-2xl p-3.5 sm:p-4 hover:border-orange-500 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/70 flex items-center justify-center text-sm font-extrabold text-tomcat-blend shrink-0">
                      {job.badge}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm sm:text-base leading-snug truncate group-hover:text-orange-400 transition">
                        {job.title}
                      </div>
                      <div className="text-xs theme-text-muted truncate mt-0.5">
                        {job.company} · {job.location}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 theme-text-muted group-hover:text-orange-400 shrink-0 transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SkillDetailModal
        skill={selectedModal}
        onClose={() => setSelectedModal(null)}
      />
    </div>
  );
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Đang tải AI Templates...</div>}>
      <SkillsInner />
    </Suspense>
  );
}
