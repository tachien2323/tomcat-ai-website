"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Search,
  Terminal,
  Bot,
  Code2,
  Cpu,
  FileCode2,
  Workflow,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { SkillTemplateItem } from "@/types/site";
import { SkillDetailModal } from "@/components/SkillDetailModal";
import { keepViCompounds } from "@/utils/viText";

const CATEGORY_LIST: {
  id: "Tất cả" | SkillTemplateItem["category"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "Tất cả", label: "Tất cả Thư viện", icon: Layers },
  { id: "Skills", label: "Skills", icon: Sparkles },
  { id: "Agents", label: "Agents", icon: Bot },
  { id: "Prompts", label: "Prompts", icon: FileCode2 },
  { id: "Commands", label: "Commands", icon: Terminal },
  { id: "MCPs", label: "MCPs", icon: Cpu },
  { id: "Workflows", label: "Workflows", icon: Workflow },
  { id: "Templates", label: "Templates", icon: Code2 },
];

export default function SkillsPage() {
  const { config } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORY_LIST)[number]["id"]>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<SkillTemplateItem | null>(null);

  const enabledSkills = useMemo(
    () => config.skills.filter((s) => s.enabled),
    [config.skills]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "Tất cả": enabledSkills.length };
    for (const s of enabledSkills) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }
    return counts;
  }, [enabledSkills]);

  const filteredSkills = useMemo(() => {
    return enabledSkills.filter((sk) => {
      const matchCat =
        selectedCategory === "Tất cả" || sk.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        sk.name.toLowerCase().includes(q) ||
        sk.titleVi.toLowerCase().includes(q) ||
        sk.description.toLowerCase().includes(q) ||
        sk.tag.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [enabledSkills, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation (like phandonggiang.com/ai-templates) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="theme-surface border rounded-2xl p-4 space-y-2 sticky top-28">
            <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
              THƯ VIỆN {config.brand.brandName}
            </div>
            {CATEGORY_LIST.map((item) => {
              const Icon = item.icon;
              const active = selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedCategory(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-orange-600/25 to-blue-900/40 text-orange-400 border border-orange-500/50"
                      : "hover:bg-blue-950/40 theme-text-muted"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-orange-400" : "text-blue-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-950/70 text-blue-200">
                    {categoryCounts[item.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-8">
          {/* Top Hero Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0a1633] via-[#060b18] to-[#231208] border border-blue-800/70 p-6 sm:p-10 space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 leading-snug">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>
                <span className="block sm:inline whitespace-nowrap">
                  THƯ VIỆN CLAUDE CODE, ANTIGRAVITY
                </span>
                <span className="block sm:inline whitespace-nowrap sm:ml-1">
                  &amp; AI WORKFLOWS
                </span>
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight whitespace-nowrap">
                AI{" "}
                <span className="text-tomcat-blend">
                  TEMPLATES &amp; SKILLS
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl text-balance">
                {keepViCompounds(
                  "Khám phá, chọn và kết hợp các cấu hình AI, System Prompts, Subagents và MCP hữu ích cho công việc và dự án của bạn."
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-300">
              <div>
                <span className="text-2xl font-extrabold text-white">2.055+</span>{" "}
                <span className="text-xs text-slate-400">Templates</span>
              </div>
              <div className="h-6 w-px bg-blue-800/60" />
              <div>
                <span className="text-2xl font-extrabold text-orange-400">7</span>{" "}
                <span className="text-xs text-slate-400">Loại công cụ</span>
              </div>
              <div className="h-6 w-px bg-blue-800/60" />
              <div>
                <span className="font-bold text-white">Mã nguồn mở</span>{" "}
                <span className="text-xs text-slate-400">· Sẵn sàng sử dụng</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                  BROWSE LIBRARY
                </div>
                <h2 className="text-2xl font-extrabold">{selectedCategory}</h2>
              </div>
              <span className="text-xs theme-text-muted">
                Hiển thị {filteredSkills.length} kết quả
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên skill, mô tả, thẻ danh mục..."
                  aria-label="Tìm kiếm Skill và AI Template"
                  className="w-full pl-10 pr-14 py-3 rounded-xl theme-surface border text-sm focus:outline-none focus:border-orange-500"
                />
                <span className="hidden sm:inline-block absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 text-[10px] font-mono border border-blue-800/60">
                  ⌘K
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl theme-surface border text-xs font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-orange-400" />
                <span>Phổ biến nhất</span>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSkills.map((sk) => (
              <div
                key={sk.id}
                onClick={() => setSelectedSkill(sk)}
                className="group cursor-pointer theme-surface border rounded-2xl p-6 flex flex-col justify-between hover:border-orange-500 transition shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                      {sk.tag}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      ↗ {sk.downloadsCount}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono font-extrabold text-lg group-hover:text-orange-400 transition">
                      {sk.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-blue-400 mt-0.5 leading-snug">
                      {keepViCompounds(sk.titleVi)}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                    {keepViCompounds(sk.description)}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t theme-border flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded bg-blue-950/70 text-blue-200 font-mono">
                    {sk.category} · {sk.level}
                  </span>
                  <span className="font-bold text-orange-400 inline-flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" />
                    Xem & Copy Prompt
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
