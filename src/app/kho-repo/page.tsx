"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Languages,
  Search,
  Star,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { keepViCompounds } from "@/utils/viText";
import catalogJson from "@/data/khoRepoCatalog.json";

interface CatalogTopic {
  slug: string;
  name: string;
  blurb: string;
  count: number;
  group: string;
}

interface CatalogRepo {
  slug: string;
  fullName: string;
  owner: string;
  name: string;
  topic: string;
  topicSlug: string;
  stars: string;
  starsNum: number;
  language: string;
  description: string;
  newestRank?: number;
}

type SortKey = "stars" | "newest" | "name";

const PAGE_SIZE = 24;
const GROUP_ORDER = [
  "AI & LLM",
  "DỮ LIỆU & WEB",
  "LẬP TRÌNH",
  "HẠ TẦNG & BẢO MẬT",
  "ỨNG DỤNG",
  "HỌC TẬP",
];

// Maps the topics used by the admin-managed "GitHub Repo" tab to catalog topics
const ADMIN_TOPIC_MAP: Record<string, string> = {
  "AI Agents": "agent",
  "Vibe Coding": "coding",
  Automation: "platform",
  "RAG & LLM": "platform",
  "MCP & Tools": "agent",
  "Prompt Engineering": "skills",
  "Video & Audio AI": "genvideo",
};

function parseStars(str: string): number {
  const s = (str || "").trim().toUpperCase();
  if (s.endsWith("K")) return Math.round(parseFloat(s.slice(0, -1)) * 1000);
  if (s.endsWith("M")) return Math.round(parseFloat(s.slice(0, -1)) * 1000000);
  return parseInt(s.replace(/[^\d]/g, ""), 10) || 0;
}

function formatTotal(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(".", ",")} triệu`;
  }
  return n.toLocaleString("vi-VN");
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

/** Renders a repo name with soft break points after - _ . so it never splits mid-word. */
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



function RepoCover({ owner, name }: { owner: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#0f295c] via-[#0b1326] to-[#3a1c0a] px-4 text-center">
        <Github className="w-7 h-7 text-orange-400" />
        <span className="text-xs text-blue-200">{owner}/</span>
        <span className="text-base font-extrabold text-white break-all">{name}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://opengraph.githubassets.com/1/${owner}/${name}`}
      alt={`${owner}/${name}`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  );
}

function RankList({
  id,
  eyebrow,
  title,
  icon,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  items: CatalogRepo[];
}) {
  return (
    <div id={id} className="scroll-mt-28 space-y-4">
      <div>
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-xl sm:text-2xl font-extrabold inline-flex items-center gap-2 leading-tight">
          {icon}
          <span>{title}</span>
        </h2>
      </div>
      <div className="space-y-2.5">
        {items.map((r, idx) => (
          <a
            key={r.slug}
            href={`https://github.com/${r.fullName}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 sm:gap-4 theme-surface border rounded-2xl p-3.5 sm:p-4 hover:border-orange-500 transition"
          >
            <span className="w-9 text-center text-lg sm:text-xl font-extrabold text-tomcat-blend shrink-0">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-mono font-bold text-sm sm:text-base truncate group-hover:text-orange-400 transition">
                {r.fullName}
              </div>
              <div className="text-xs theme-text-muted truncate">
                {keepViCompounds(r.topic)}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-400 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              {r.stars}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function KhoRepoInner() {
  const { config } = useSiteConfig();
  const searchParams = useSearchParams();
  const listTopRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const topics = catalogJson.topics as CatalogTopic[];

  // Catalog + repos added in the admin "Kho GitHub Repo" tab
  const allRepos = useMemo<CatalogRepo[]>(() => {
    const base = catalogJson.repos as CatalogRepo[];
    const known = new Set(base.map((r) => r.fullName.toLowerCase()));
    const extras: CatalogRepo[] = [];
    for (const r of config.repos) {
      if (!r.enabled) continue;
      // Only repos added by hand in the admin panel (id = "repo-<timestamp>") are merged;
      // the built-in sample repos are already part of the catalog.
      if (!/^repo-\d{10,}$/.test(r.id)) continue;
      const fullName = `${r.owner}/${r.name}`;
      if (known.has(fullName.toLowerCase())) continue;
      known.add(fullName.toLowerCase());
      const topicSlug = ADMIN_TOPIC_MAP[r.topic] || "other";
      const topic = topics.find((t) => t.slug === topicSlug);
      extras.push({
        slug: fullName.toLowerCase().replace(/\//g, "-"),
        fullName,
        owner: r.owner,
        name: r.name,
        topic: topic?.name || "Khác",
        topicSlug,
        stars: r.stars,
        starsNum: parseStars(r.stars),
        language: r.language || "Khác",
        description: r.description,
      });
    }
    return [...base, ...extras];
  }, [config.repos, topics]);

  const [topicSlug, setTopicSlug] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState<SortKey>("stars");
  const [page, setPage] = useState(1);

  // Read ?chu-de= from the URL
  useEffect(() => {
    const p = searchParams.get("chu-de");
    if (p && topics.some((t) => t.slug === p)) setTopicSlug(p);
  }, [searchParams, topics]);

  // Ctrl/⌘ + K focuses the search box
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

  const topicCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of allRepos) c[r.topicSlug] = (c[r.topicSlug] || 0) + 1;
    return c;
  }, [allRepos]);

  const activeTopic = topics.find((t) => t.slug === topicSlug) || null;

  const topicRepos = useMemo(
    () =>
      topicSlug === "all"
        ? allRepos
        : allRepos.filter((r) => r.topicSlug === topicSlug),
    [allRepos, topicSlug]
  );

  const languageOptions = useMemo(() => {
    const c = new Map<string, number>();
    for (const r of topicRepos) c.set(r.language, (c.get(r.language) || 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [topicRepos]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    let list = topicRepos.filter((r) => {
      if (language !== "all" && r.language !== language) return false;
      if (!q) return true;
      return (
        normalize(r.fullName).includes(q) ||
        normalize(r.description).includes(q) ||
        normalize(r.language).includes(q) ||
        normalize(r.topic).includes(q)
      );
    });
    list = [...list];
    if (sort === "stars") list.sort((a, b) => b.starsNum - a.starsNum);
    else if (sort === "name")
      list.sort((a, b) => a.fullName.localeCompare(b.fullName));
    else
      list.sort((a, b) => {
        const ra = a.newestRank ?? 9999;
        const rb = b.newestRank ?? 9999;
        return ra !== rb ? ra - rb : b.starsNum - a.starsNum;
      });
    return list;
  }, [topicRepos, query, language, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const hasFilter =
    topicSlug !== "all" || query.trim() !== "" || language !== "all" || sort !== "stars";

  const totalStars = useMemo(
    () => allRepos.reduce((sum, r) => sum + r.starsNum, 0),
    [allRepos]
  );

  const newestList = useMemo(
    () =>
      allRepos
        .filter((r) => r.newestRank)
        .sort((a, b) => (a.newestRank || 0) - (b.newestRank || 0))
        .slice(0, 6),
    [allRepos]
  );
  const topStarsList = useMemo(
    () => [...allRepos].sort((a, b) => b.starsNum - a.starsNum).slice(0, 6),
    [allRepos]
  );

  const selectTopic = (slug: string) => {
    setTopicSlug(slug);
    setLanguage("all");
    setPage(1);
    try {
      const url = slug === "all" ? "/kho-repo" : `/kho-repo?chu-de=${slug}`;
      window.history.replaceState(null, "", url);
    } catch {
      // ignore
    }
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setQuery("");
    setLanguage("all");
    setSort("stars");
    selectTopic("all");
  };

  const goPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), pageCount));
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectClass =
    "w-full theme-surface border rounded-xl pl-10 pr-3 py-3 text-sm font-medium focus:outline-none focus:border-orange-500 cursor-pointer";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-tomcat-blend text-slate-950 flex items-center justify-center shadow-md">
            <Github className="w-5 h-5" />
          </span>
          <span className="text-lg font-extrabold">
            Kho <span className="text-tomcat-blend">Repo</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#moi-them"
            onClick={scrollToId("moi-them")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl theme-surface border hover:border-orange-500 text-xs sm:text-sm font-bold transition whitespace-nowrap"
          >
            <Clock className="w-4 h-4 text-orange-400" />
            Mới thêm
          </a>
          <a
            href="#nhieu-sao-nhat"
            onClick={scrollToId("nhieu-sao-nhat")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl theme-surface border hover:border-orange-500 text-xs sm:text-sm font-bold transition whitespace-nowrap"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            Nhiều sao nhất
          </a>
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs sm:text-sm font-bold shadow-md whitespace-nowrap"
          >
            AI Templates
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)] gap-6 items-start">
        {/* Sidebar (desktop) */}
        <aside
          aria-label="Chủ đề"
          className="hidden lg:block theme-surface border rounded-2xl p-3 sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto"
        >
          <button
            type="button"
            aria-pressed={topicSlug === "all"}
            onClick={() => selectTopic("all")}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
              topicSlug === "all"
                ? "bg-orange-600/20 text-orange-400 border border-orange-500/50"
                : "hover:bg-blue-950/40 border border-transparent"
            }`}
          >
            <span>Tất cả repo</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-950/70 text-blue-200">
              {allRepos.length.toLocaleString("vi-VN")}
            </span>
          </button>

          {GROUP_ORDER.map((g) => {
            const groupTopics = topics.filter((t) => t.group === g);
            if (!groupTopics.length) return null;
            return (
              <div key={g} className="mt-4">
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-orange-400">
                  {g}
                </div>
                <div className="space-y-0.5">
                  {groupTopics.map((t) => {
                    const active = topicSlug === t.slug;
                    return (
                      <button
                        key={t.slug}
                        type="button"
                        aria-pressed={active}
                        onClick={() => selectTopic(t.slug)}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-[13px] text-left font-semibold transition cursor-pointer ${
                          active
                            ? "bg-orange-600/20 text-orange-400 border border-orange-500/50"
                            : "theme-text-muted hover:bg-blue-950/40 border border-transparent"
                        }`}
                      >
                        <span className="leading-snug">{keepViCompounds(t.name)}</span>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-full bg-blue-950/70 text-blue-200 shrink-0">
                          {topicCounts[t.slug] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="mt-4 px-3 text-[11px] theme-text-muted">
            Dữ liệu tuyển chọn từ GitHub
          </div>
        </aside>

        {/* Main column */}
        <div className="space-y-8 min-w-0">
          {/* Mobile topic picker */}
          <div className="lg:hidden relative">
            <select
              aria-label="Chọn chủ đề"
              value={topicSlug}
              onChange={(e) => selectTopic(e.target.value)}
              className="w-full theme-surface border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="all">Tất cả repo ({allRepos.length})</option>
              {GROUP_ORDER.map((g) => (
                <optgroup key={g} label={g}>
                  {topics
                    .filter((t) => t.group === g)
                    .map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name} ({topicCounts[t.slug] || 0})
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Hero */}
          <div className="rounded-3xl bg-gradient-to-br from-[#081533] via-[#050811] to-[#1d1109] border border-blue-800/70 p-6 sm:p-9 space-y-4 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Tuyển tập repo GitHub mã nguồn mở
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight whitespace-nowrap">
              KHO <span className="text-tomcat-blend">REPO</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl text-balance">
              {keepViCompounds(
                `Những repo GitHub đáng chú ý về AI Agent, công cụ lập trình, giao diện, dữ liệu và tài liệu tự học, được tuyển chọn bởi ${config.brand.brandName}.`
              )}
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              {[
                { v: allRepos.length.toLocaleString("vi-VN"), l: "Repo" },
                { v: String(topics.length), l: "Chủ đề" },
                { v: formatTotal(totalStars), l: "Lượt gắn sao" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-[#0b1630]/80 border border-blue-800/60 px-3 py-3">
                  <div className="text-lg sm:text-2xl font-extrabold text-tomcat-blend whitespace-nowrap">
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
          <div ref={listTopRef} id="danh-sach-repo" className="scroll-mt-28 space-y-4">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
                {activeTopic ? "Chủ đề" : "Duyệt kho repo"}
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold leading-tight">
                {activeTopic ? keepViCompounds(activeTopic.name) : "Tất cả repo"}
              </h2>
              {activeTopic && (
                <p className="mt-1 text-sm theme-text-muted max-w-3xl">
                  {keepViCompounds(activeTopic.blurb)}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px_200px] gap-3">
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
                  placeholder="Tìm theo tên repo, công dụng, ngôn ngữ..."
                  aria-label="Tìm kiếm GitHub Repo"
                  className="w-full pl-10 pr-16 py-3 rounded-xl theme-surface border text-sm focus:outline-none focus:border-orange-500"
                />
                <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 text-[10px] font-mono border border-blue-800/60">
                  Ctrl K
                </kbd>
              </div>

              <div className="relative">
                <Languages className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Lọc theo ngôn ngữ"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                >
                  <option value="all">Tất cả ngôn ngữ</option>
                  {languageOptions.map(([lang, n]) => (
                    <option key={lang} value={lang}>
                      {lang} ({n})
                    </option>
                  ))}
                </select>
              </div>

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
                  <option value="stars">Nhiều sao nhất</option>
                  <option value="newest">Mới thêm gần đây</option>
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
                  repo phù hợp
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
                Trang {safePage} / {pageCount}
              </span>
            </div>
          </div>

          {/* Repo grid */}
          {pageItems.length === 0 ? (
            <div className="theme-surface border rounded-2xl p-10 text-center space-y-2">
              <div className="text-lg font-extrabold">Không tìm thấy repo phù hợp</div>
              <p className="text-sm theme-text-muted">
                Hãy thử từ khóa khác hoặc bấm &ldquo;Xóa bộ lọc&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {pageItems.map((r) => (
                <article
                  key={r.slug}
                  className="group theme-surface border rounded-2xl overflow-hidden flex flex-col hover:border-orange-500 transition shadow-md"
                >
                  <a
                    href={`https://github.com/${r.fullName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex flex-col"
                  >
                    <div className="aspect-[2/1] bg-gradient-to-br from-[#0f295c] via-[#0b1326] to-[#2a1608] overflow-hidden">
                      <RepoCover owner={r.owner} name={r.name} />
                    </div>
                    <div className="p-4 space-y-2.5 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-900/60 text-blue-200 border border-blue-700/60 truncate max-w-[70%]">
                          {keepViCompounds(r.topic)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {r.stars}
                        </span>
                      </div>
                      <h3 className="font-mono text-sm sm:text-base break-words leading-snug">
                        <span className="theme-text-muted">
                          <SoftBreak text={r.owner} />/<wbr />
                        </span>
                        <span className="font-extrabold group-hover:text-orange-400 transition">
                          <SoftBreak text={r.name} />
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm theme-text-muted leading-relaxed line-clamp-3">
                        {keepViCompounds(r.description)}
                      </p>
                    </div>
                  </a>
                  <div className="px-4 py-3 border-t theme-border flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 theme-text-muted">
                      <Languages className="w-3.5 h-3.5" />
                      {r.language}
                    </span>
                    <a
                      href={`https://github.com/${r.fullName}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-orange-400 hover:text-orange-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
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

          {/* Highlight sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4">
            <RankList
              id="moi-them"
              eyebrow="Vừa cập nhật"
              title="Mới thêm gần đây"
              icon={<Clock className="w-5 h-5 text-orange-400" />}
              items={newestList}
            />
            <RankList
              id="nhieu-sao-nhat"
              eyebrow="Nổi bật nhất"
              title="Nhiều sao nhất"
              icon={<Flame className="w-5 h-5 text-orange-400" />}
              items={topStarsList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KhoRepoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Đang tải Kho Repo...</div>}>
      <KhoRepoInner />
    </Suspense>
  );
}
