"use client";

import React, { useState, useMemo } from "react";
import { Search, Star, GitFork, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { keepViCompounds } from "@/utils/viText";

export default function KhoRepoPage() {
  const { config } = useSiteConfig();
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Tất cả");

  const enabledRepos = useMemo(
    () => config.repos.filter((r) => r.enabled),
    [config.repos]
  );

  const topics = useMemo(() => {
    const set = new Set(enabledRepos.map((r) => r.topic));
    return ["Tất cả", ...Array.from(set)];
  }, [enabledRepos]);

  const filteredRepos = useMemo(() => {
    return enabledRepos.filter((r) => {
      const matchTopic = selectedTopic === "Tất cả" || r.topic === selectedTopic;
      const q = search.trim().toLowerCase();
      const matchQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.topic.toLowerCase().includes(q);
      return matchTopic && matchQuery;
    });
  }, [enabledRepos, selectedTopic, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#081533] via-[#050811] to-[#1d1109] border border-blue-800/70 p-6 sm:p-10 space-y-4 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
          <Github className="w-4 h-4" />
          <span>OPEN SOURCE AI REPOSITORY VAULT</span>
        </div>
        <h1 className="text-2xl sm:text-5xl font-extrabold text-white leading-tight">
          <span className="whitespace-nowrap">Kho GitHub Repo</span>{" "}
          <span className="text-tomcat-blend whitespace-nowrap">
            Hàng Đầu
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl text-balance">
          {keepViCompounds(
            `Danh bạ các dự án mã nguồn mở chất lượng nhất về AI Agents, Vibe Coding, Workflow Automation, RAG, LLM và MCP được tuyển chọn bởi ${config.brand.brandName}.`
          )}
        </p>
      </div>

      {/* Search & Topic Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm repo theo tên, chủ đề, ngôn ngữ..."
            aria-label="Tìm kiếm GitHub Repo"
            className="w-full pl-10 pr-4 py-3 rounded-xl theme-surface border text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {topics.map((tp) => (
            <button
              key={tp}
              type="button"
              onClick={() => setSelectedTopic(tp)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedTopic === tp
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/25"
                  : "theme-surface border hover:border-orange-500"
              }`}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Repo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="group theme-surface border rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-blue-200 border border-blue-700/60">
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
                <h2 className="font-mono font-extrabold text-lg group-hover:text-orange-400 transition flex items-center justify-between">
                  <span>
                    {repo.owner}/{repo.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                </h2>
                <span className="text-xs text-blue-400 font-medium">
                  Ngôn ngữ: {repo.language}
                </span>
              </div>

              <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                {repo.description}
              </p>
            </div>

            <div className="pt-4 mt-5 border-t theme-border flex flex-wrap gap-1.5">
              {repo.highlights.map((hl, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-blue-950/70 text-blue-200 text-[11px]"
                >
                  {hl}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
