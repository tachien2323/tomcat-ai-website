"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Sun,
  Moon,
  Sparkles,
  Settings2,
  Menu,
  X,
  BookOpen,
  Wrench,
  Bot,
  FileText,
  Briefcase,
  Mail,
} from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function Navbar() {
  const { config } = useSiteConfig();
  const pathname = usePathname();
  const [renderedScheme, setRenderedScheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveScheme = () => {
      const meta = document.querySelector('meta[name="color-scheme"]');
      const metaContent = meta?.getAttribute("content") || "light dark";
      if (metaContent === "dark" || metaContent === "light") {
        setRenderedScheme(metaContent);
      } else {
        setRenderedScheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    resolveScheme();

    const onMediaChange = () => resolveScheme();
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === "color-scheme") {
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
          meta.setAttribute("content", e.newValue ?? "light dark");
        }
        resolveScheme();
      }
    };

    mediaQuery.addEventListener("change", onMediaChange);
    window.addEventListener("storage", onStorageChange);
    return () => {
      mediaQuery.removeEventListener("change", onMediaChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const handleToggleColorScheme = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemScheme: "dark" | "light" = mediaQuery.matches ? "dark" : "light";
    const targetScheme: "dark" | "light" = renderedScheme === "dark" ? "light" : "dark";
    const meta = document.querySelector('meta[name="color-scheme"]');

    try {
      if (targetScheme === systemScheme) {
        localStorage.removeItem("color-scheme");
        if (meta) meta.setAttribute("content", "light dark");
      } else {
        localStorage.setItem("color-scheme", targetScheme);
        if (meta) meta.setAttribute("content", targetScheme);
      }
    } catch {
      if (meta) meta.setAttribute("content", targetScheme);
    }
    setRenderedScheme(targetScheme);
  };

  const { features, brand } = config;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#050811]/90 border-b border-[#1d315c] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 group-hover:border-orange-400 transition shadow-md bg-[#0f295c] flex items-center justify-center font-extrabold text-white text-sm">
              TC
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-tomcat-blend">
                {brand.brandName}
              </span>
              <span className="hidden sm:block text-[11px] text-blue-300/80 -mt-1 font-medium">
                AI Portfolio & Resource Hub
              </span>
            </div>
          </Link>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={handleToggleColorScheme}
              title={
                renderedScheme === "dark"
                  ? "Chuyển sang giao diện Sáng (Light Mode)"
                  : "Chuyển sang giao diện Tối (Dark Mode)"
              }
              aria-label="Chuyển đổi giao diện Sáng / Tối"
              className="w-10 h-10 rounded-xl border border-blue-800/70 bg-[#0b152c] hover:bg-blue-950/90 hover:border-orange-500/60 flex items-center justify-center text-blue-200 hover:text-orange-400 transition cursor-pointer"
            >
              {renderedScheme === "dark" ? (
                <Sun className="w-4 h-4 text-orange-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-300" />
              )}
            </button>

            {/* Highlighted AI Templates CTA */}
            {features.skillsHub && (
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/30 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Templates</span>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden w-10 h-10 rounded-xl border border-blue-800/70 bg-[#0b152c] flex items-center justify-center text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Second Row Navigation Bar (Desktop) - phandonggiang.com style */}
        <nav className="hidden lg:flex items-center gap-2 py-2.5 border-t border-blue-950/80 overflow-x-auto text-sm">
          {features.skillsHub && (
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-xs bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white shadow-md shadow-orange-600/20 hover:brightness-110 transition shrink-0"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Skills Hot</span>
            </Link>
          )}

          {features.repoVault && (
            <Link
              href="/kho-repo"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold text-xs bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-700/25 hover:brightness-110 transition shrink-0"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Kho Repo Hàng Đầu</span>
              <span className="px-1.5 py-0.2 bg-white text-blue-900 rounded-full text-[10px] font-extrabold uppercase">
                Mới
              </span>
            </Link>
          )}

          {features.freeCourse && (
            <Link
              href="/khoa-hoc-ai"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                pathname === "/khoa-hoc-ai"
                  ? "text-orange-400 bg-blue-950/70"
                  : "text-slate-300 hover:text-white hover:bg-blue-950/50"
              }`}
            >
              Khóa Học AI Miễn Phí
            </Link>
          )}

          {features.aiTools && (
            <Link
              href="/#tools"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-blue-950/50 transition shrink-0"
            >
              Công cụ AI
            </Link>
          )}

          {features.customGpts && (
            <Link
              href="/#gpt-doc-quyen"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-blue-950/50 transition shrink-0"
            >
              Bộ GPT & Agent
            </Link>
          )}

          {features.articles && (
            <Link
              href="/bai-viet"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                pathname?.startsWith("/bai-viet")
                  ? "text-orange-400 bg-blue-950/70"
                  : "text-slate-300 hover:text-white hover:bg-blue-950/50"
              }`}
            >
              Bài Viết & Playbook
            </Link>
          )}

          {features.b2bServices && (
            <Link
              href="/#services"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-blue-950/50 transition shrink-0"
            >
              Giải Pháp Doanh Nghiệp
            </Link>
          )}

          <Link
            href="/about"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
              pathname === "/about"
                ? "text-orange-400 bg-blue-950/70"
                : "text-slate-300 hover:text-white hover:bg-blue-950/50"
            }`}
          >
            Về TOM CAT AI
          </Link>

          {features.contactSection && (
            <Link
              href="/#contact"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-blue-950/50 transition shrink-0"
            >
              Liên hệ
            </Link>
          )}
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-900/60 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {features.skillsHub && (
                <Link
                  href="/skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-orange-600/20 border border-orange-500/40 text-orange-300 text-xs font-bold"
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  Skills & Templates
                </Link>
              )}
              {features.repoVault && (
                <Link
                  href="/kho-repo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-200 text-xs font-bold"
                >
                  <Github className="w-4 h-4 text-blue-400" />
                  Kho GitHub Repo
                </Link>
              )}
              {features.freeCourse && (
                <Link
                  href="/khoa-hoc-ai"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-slate-200 text-xs font-medium"
                >
                  <BookOpen className="w-4 h-4 text-orange-400" />
                  Khóa Học AI Free
                </Link>
              )}
              {features.aiTools && (
                <Link
                  href="/#tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-slate-200 text-xs font-medium"
                >
                  <Wrench className="w-4 h-4 text-blue-400" />
                  Công cụ AI
                </Link>
              )}
              {features.customGpts && (
                <Link
                  href="/#gpt-doc-quyen"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-slate-200 text-xs font-medium"
                >
                  <Bot className="w-4 h-4 text-orange-400" />
                  Bộ GPT & Agent
                </Link>
              )}
              {features.articles && (
                <Link
                  href="/bai-viet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-slate-200 text-xs font-medium"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  Bài Viết AI
                </Link>
              )}
              {features.b2bServices && (
                <Link
                  href="/#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-slate-200 text-xs font-medium"
                >
                  <Briefcase className="w-4 h-4 text-orange-400" />
                  Dịch Vụ Doanh Nghiệp
                </Link>
              )}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-slate-200 text-xs font-medium"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                Về TOM CAT AI
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
