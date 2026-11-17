"use client";

import React from "react";
import Link from "next/link";
import { Settings2, Mail, ArrowUpRight } from "lucide-react";
import { Youtube, Facebook, Github, Linkedin } from "@/components/BrandIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function Footer() {
  const { config } = useSiteConfig();
  const { brand, features } = config;

  return (
    <footer className="border-t border-[#1d315c] bg-[#040710] text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0f295c] border-2 border-orange-500 flex items-center justify-center shrink-0">
                <img
                  src={
                    brand.avatarUrl && !brand.avatarUrl.includes("unsplash.com")
                      ? brand.avatarUrl
                      : "/avatar-tomcat.jpg"
                  }
                  alt={brand.brandName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="font-extrabold text-lg text-tomcat-blend">{brand.brandName}</div>
                <div className="text-xs text-blue-300/80">AI Solutions & Knowledge Hub</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{brand.heroSubtitle}</p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={brand.contact.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-[#0c162d] border border-blue-900/70 hover:border-orange-500 flex items-center justify-center text-slate-300 hover:text-orange-400 transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={brand.contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-[#0c162d] border border-blue-900/70 hover:border-orange-500 flex items-center justify-center text-slate-300 hover:text-orange-400 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={brand.contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-[#0c162d] border border-blue-900/70 hover:border-orange-500 flex items-center justify-center text-slate-300 hover:text-orange-400 transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={brand.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-[#0c162d] border border-blue-900/70 hover:border-orange-500 flex items-center justify-center text-slate-300 hover:text-orange-400 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${brand.contact.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-[#0c162d] border border-blue-900/70 hover:border-orange-500 flex items-center justify-center text-slate-300 hover:text-orange-400 transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Kho Tài Nguyên AI */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4">
              Kho Tài Nguyên AI
            </h3>
            <ul className="space-y-2.5 text-xs">
              {features.skillsHub && (
                <li>
                  <Link href="/skills" className="hover:text-orange-400 transition">
                    Thư viện AI Skills & Templates (2.050+)
                  </Link>
                </li>
              )}
              {features.repoVault && (
                <li>
                  <Link href="/kho-repo" className="hover:text-orange-400 transition">
                    Kho GitHub Repo Hàng Đầu (1.000+)
                  </Link>
                </li>
              )}
              {features.freeCourse && (
                <li>
                  <Link href="/khoa-hoc-ai" className="hover:text-orange-400 transition">
                    Khóa Học AI Miễn Phí (4 Cấp Độ)
                  </Link>
                </li>
              )}
              {features.aiTools && (
                <li>
                  <Link href="/#tools" className="hover:text-orange-400 transition">
                    Danh bạ Công cụ AI Khuyên dùng
                  </Link>
                </li>
              )}
              {features.articles && (
                <li>
                  <Link href="/bai-viet" className="hover:text-orange-400 transition">
                    Bài viết & Playbook Thực chiến
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Dành cho Doanh nghiệp & Cá nhân */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
              Giải Pháp & Hợp Tác
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition">
                  Hồ sơ Năng lực Chuyên gia ({brand.brandName})
                </Link>
              </li>
              {features.b2bServices && (
                <li>
                  <Link href="/#services" className="hover:text-orange-400 transition">
                    Đào tạo AI In-house cho Doanh nghiệp
                  </Link>
                </li>
              )}
              {features.b2bServices && (
                <li>
                  <Link href="/#services" className="hover:text-orange-400 transition">
                    Tư vấn & Xây dựng Hệ thống AI Automation
                  </Link>
                </li>
              )}
              {features.customGpts && (
                <li>
                  <Link href="/#gpt-doc-quyen" className="hover:text-orange-400 transition">
                    Bộ Custom GPTs & AI Agents Độc quyền
                  </Link>
                </li>
              )}
              {features.contactSection && (
                <li>
                  <Link href="/#contact" className="hover:text-orange-400 transition">
                    Liên hệ Tư vấn & Báo giá
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Liên hệ hợp tác */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Liên Hệ & Hợp Tác
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đồng hành cùng Doanh nghiệp & Cá nhân trong đào tạo AI thực chiến, xây dựng hệ thống AI Agent và tự động hóa quy trình làm việc.
            </p>
            <a
              href={`mailto:${brand.contact.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-orange-600 text-white text-xs font-semibold border border-blue-700/80 transition shadow-md"
            >
              <Mail className="w-4 h-4 text-orange-400" />
              <span>{brand.contact.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="text-xs text-slate-400 pt-1">
              Hotline / Zalo: <span className="text-blue-300 font-semibold">{brand.contact.phone}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {brand.brandName}. Thiết kế chuẩn thương hiệu Navy · Black · Orange.</p>
          <p>Sẵn sàng triển khai trên GitHub & Vercel Production.</p>
        </div>
      </div>
    </footer>
  );
}
