"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings2,
  Power,
  UserCheck,
  Wrench,
  Sparkles,
  FileText,
  Save,
  RotateCcw,
  Download,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Github } from "@/components/BrandIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";
import {
  FeatureFlags,
  AiToolItem,
  SkillTemplateItem,
  RepoItem,
  ArticleItem,
  VideoItem,
} from "@/types/site";

const FEATURE_META: {
  key: keyof FeatureFlags;
  title: string;
  description: string;
  group: "Trang chủ & Điều hướng" | "Kho Tài nguyên AI" | "Kết nối & Tiện ích nổi";
}[] = [
  {
    key: "heroQuickPills",
    title: "Nút Truy Cập Nhanh Trên Hero (Quick Pills)",
    description: "Hàng nút lối tắt ngay dưới tiêu đề chính trên trang chủ.",
    group: "Trang chủ & Điều hướng",
  },
  {
    key: "aboutSection",
    title: "Phân Khu Giới Thiệu Bản Thân & Năng Lực AI",
    description: "Khối ảnh diễn giả, câu chuyện thương hiệu TOM CAT AI và liên kết mạng xã hội.",
    group: "Trang chủ & Điều hướng",
  },
  {
    key: "b2bServices",
    title: "Phân Khu Giải Pháp Doanh Nghiệp & Cá Nhân (B2B/B2C)",
    description: "Các gói Đào tạo AI In-house, Tư vấn AI Automation và Coaching 1-1.",
    group: "Trang chủ & Điều hướng",
  },
  {
    key: "aiTools",
    title: "Danh Bạ Công Cụ AI Khuyên Dùng (#tools)",
    description: "Khối tra cứu, tìm kiếm và lọc các công cụ AI phục vụ công việc.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "skillsHub",
    title: "Thư Viện AI Skills & Templates (/skills)",
    description: "Phân khu trên trang chủ và trang thư viện Skills, Prompts, Subagents, MCPs.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "repoVault",
    title: "Kho GitHub Repo Hàng Đầu (/kho-repo)",
    description: "Phân khu và trang danh bạ các dự án mã nguồn mở AI chọn lọc.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "customGpts",
    title: "Bộ Custom GPT & AI Agent Độc Quyền (#gpt-doc-quyen)",
    description: "Danh sách các trợ lý GPT chuyên biệt do TOM CAT AI huấn luyện.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "latestVideos",
    title: "Phân Khu Video Hướng Dẫn Mới Nhất (#videos)",
    description: "Video tiêu điểm và lưới video hướng dẫn thực chiến trên trang chủ.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "freeCourse",
    title: "Khóa Học AI Miễn Phí 4 Cấp Độ (/khoa-hoc-ai)",
    description: "Lộ trình 18 bài học miễn phí trên trang chủ và trang khóa học riêng.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "memberVideos",
    title: "Phân Khu Video Chuyên Sâu / Hội Viên Pro",
    description: "Khối video case study nâng cao dành cho hội viên hoặc khách hàng Pro.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "articles",
    title: "Hệ Thống Bài Viết & Playbook Chuyên Sâu (/bai-viet)",
    description: "Phân khu bài viết trên trang chủ và chuyên trang đọc bài viết Blog.",
    group: "Kho Tài nguyên AI",
  },
  {
    key: "community",
    title: "Phân Khu Cộng Đồng AI Việt Nam (#community)",
    description: "Giới thiệu các nhóm Facebook Group / Discord giao lưu chia sẻ AI.",
    group: "Kết nối & Tiện ích nổi",
  },
  {
    key: "omnichannel",
    title: "Phân Khu Hiện Diện Đa Kênh (Omnichannel)",
    description: "Lưới thẻ liên kết tới YouTube, TikTok, Facebook, GitHub, LinkedIn, X.",
    group: "Kết nối & Tiện ích nổi",
  },
  {
    key: "donation",
    title: "Phân Khu Ủng Hộ Cafe / Mã VietQR (#donate)",
    description: "Khối thông tin tài khoản ngân hàng và mã QR mời cafe.",
    group: "Kết nối & Tiện ích nổi",
  },
  {
    key: "contactSection",
    title: "Phân Khu Liên Hệ Hợp Tác & Form Tư Vấn (#contact)",
    description: "Thông tin Email, Hotline/Zalo và biểu mẫu gửi yêu cầu tư vấn.",
    group: "Kết nối & Tiện ích nổi",
  },
  {
    key: "floatingPromo",
    title: "Nút Nổi Góc Trái (Quảng Bá Bộ Skills Hot)",
    description: "Thẻ nổi cố định ở góc dưới bên trái màn hình dẫn tới sản phẩm chủ lực.",
    group: "Kết nối & Tiện ích nổi",
  },
  {
    key: "floatingCoffee",
    title: "Nút Nổi Góc Phải (Ủng Hộ 1 Ly Cafe)",
    description: "Nút nổi cố định ở góc dưới bên phải màn hình cuộn nhanh tới phần ủng hộ/liên hệ.",
    group: "Kết nối & Tiện ích nổi",
  },
];

export default function AdminBackendPage() {
  const {
    config,
    isSaving,
    lastSavedMessage,
    updateConfig,
    toggleFeature,
    resetToDefault,
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<
    "features" | "brand" | "tools" | "skills" | "repos" | "content"
  >("features");

  // Brand & Contact local editable form
  const [brandForm, setBrandForm] = useState(config.brand);

  // Sync brandForm when config loads
  React.useEffect(() => {
    setBrandForm(config.brand);
  }, [config.brand]);

  // New Tool State
  const [newTool, setNewTool] = useState({
    name: "",
    category: "Lập trình & Trợ lý AI",
    description: "",
    badge: "Mới",
    url: "https://",
    iconText: "AI",
  });

  // New Skill State
  const [newSkill, setNewSkill] = useState({
    name: "",
    titleVi: "",
    category: "Skills" as SkillTemplateItem["category"],
    tag: "Automation",
    description: "",
    installCommand: "npx tomcat-ai-skills@latest add skill ",
    promptContent: "",
    useCase: "",
  });

  // New Repo State
  const [newRepo, setNewRepo] = useState({
    owner: "",
    name: "",
    topic: "AI Agents" as RepoItem["topic"],
    stars: "10.5k",
    language: "TypeScript",
    description: "",
    url: "https://github.com/",
  });

  // New Article State
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "Chiến lược AI & Agent",
    summary: "",
    readTime: "7 phút đọc",
    tags: "AI, Automation, TOM CAT AI",
    content: "",
  });

  // New Video State
  const [newVideo, setNewVideo] = useState({
    title: "",
    category: "Vibe Coding",
    duration: "20:00",
    youtubeUrl: "https://youtube.com/@tomcatai",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    description: "",
  });

  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateConfig({
      ...config,
      brand: brandForm,
    });
  };

  const handleEnableAllFeatures = async () => {
    const allTrue = Object.keys(config.features).reduce((acc, k) => {
      acc[k as keyof FeatureFlags] = true;
      return acc;
    }, {} as FeatureFlags);
    await updateConfig({ ...config, features: allTrue });
  };

  const handleMinimalMode = async () => {
    await updateConfig({
      ...config,
      features: {
        heroQuickPills: true,
        aboutSection: true,
        b2bServices: true,
        aiTools: true,
        skillsHub: true,
        repoVault: true,
        customGpts: false,
        latestVideos: false,
        freeCourse: false,
        memberVideos: false,
        articles: true,
        community: false,
        omnichannel: false,
        donation: false,
        contactSection: true,
        floatingPromo: false,
        floatingCoffee: false,
      },
    });
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "site-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add / Toggle / Delete Handlers
  const handleAddTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTool.name.trim()) return;
    const item: AiToolItem = {
      id: `tool-${Date.now()}`,
      name: newTool.name,
      category: newTool.category,
      description: newTool.description,
      badge: newTool.badge,
      url: newTool.url,
      iconText: newTool.iconText || "AI",
      accentColor: "orange",
      featured: true,
      enabled: true,
    };
    await updateConfig({
      ...config,
      aiTools: [item, ...config.aiTools],
    });
    setNewTool({
      name: "",
      category: "Lập trình & Trợ lý AI",
      description: "",
      badge: "Mới",
      url: "https://",
      iconText: "AI",
    });
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim() || !newSkill.titleVi.trim()) return;
    const item: SkillTemplateItem = {
      id: `sk-${Date.now()}`,
      slug: newSkill.name.toLowerCase().replace(/\s+/g, "-"),
      name: newSkill.name,
      titleVi: newSkill.titleVi,
      category: newSkill.category,
      tag: newSkill.tag,
      downloadsCount: "1.250",
      description: newSkill.description,
      installCommand: newSkill.installCommand,
      promptContent: newSkill.promptContent,
      useCase: newSkill.useCase || "Ứng dụng trực tiếp vào dự án AI thực tế.",
      level: "Thực chiến",
      isHot: true,
      priceLabel: "Miễn phí",
      enabled: true,
    };
    await updateConfig({
      ...config,
      skills: [item, ...config.skills],
    });
    setNewSkill({
      name: "",
      titleVi: "",
      category: "Skills",
      tag: "Automation",
      description: "",
      installCommand: "npx tomcat-ai-skills@latest add skill ",
      promptContent: "",
      useCase: "",
    });
  };

  const handleAddRepo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepo.name.trim()) return;
    const item: RepoItem = {
      id: `repo-${Date.now()}`,
      owner: newRepo.owner || "tomcatai",
      name: newRepo.name,
      topic: newRepo.topic,
      stars: newRepo.stars,
      forks: "1.2k",
      language: newRepo.language,
      description: newRepo.description,
      highlights: ["Open Source", "Thực chiến AI"],
      url: newRepo.url,
      isFeatured: true,
      enabled: true,
    };
    await updateConfig({
      ...config,
      repos: [item, ...config.repos],
    });
    setNewRepo({
      owner: "",
      name: "",
      topic: "AI Agents",
      stars: "10.5k",
      language: "TypeScript",
      description: "",
      url: "https://github.com/",
    });
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title.trim()) return;
    const slug = newArticle.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const item: ArticleItem = {
      id: `art-${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      title: newArticle.title,
      category: newArticle.category,
      summary: newArticle.summary,
      publishedAt: new Date().toLocaleDateString("vi-VN"),
      readTime: newArticle.readTime,
      author: config.brand.brandName,
      coverGradient: "from-blue-900 via-slate-900 to-orange-600",
      tags: newArticle.tags.split(",").map((t) => t.trim()),
      content: newArticle.content || newArticle.summary,
      isFeatured: true,
      enabled: true,
    };
    await updateConfig({
      ...config,
      articles: [item, ...config.articles],
    });
    setNewArticle({
      title: "",
      category: "Chiến lược AI & Agent",
      summary: "",
      readTime: "7 phút đọc",
      tags: "AI, Automation, TOM CAT AI",
      content: "",
    });
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title.trim()) return;
    const item: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      category: newVideo.category,
      duration: newVideo.duration,
      views: "Mới đăng",
      publishedAt: "Hôm nay",
      thumbnailUrl: newVideo.thumbnailUrl,
      youtubeUrl: newVideo.youtubeUrl,
      youtubeEmbedId: "dQw4w9WgXcQ",
      description: newVideo.description,
      isFeatured: false,
      isMemberOnly: false,
      enabled: true,
    };
    await updateConfig({
      ...config,
      videos: [item, ...config.videos],
    });
    setNewVideo({
      title: "",
      category: "Vibe Coding",
      duration: "20:00",
      youtubeUrl: "https://youtube.com/@tomcatai",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      description: "",
    });
  };

  const enabledFeatureCount = Object.values(config.features).filter(Boolean).length;
  const totalFeatureCount = Object.keys(config.features).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#08142c] via-[#050811] to-[#1f1108] border border-blue-800/80 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
            <Settings2 className="w-4 h-4" />
            <span>BACKEND CONTROL CENTER · {config.brand.brandName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Quản Trị Tính Năng & Nội Dung Website
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Bật/tắt tức thì bất kỳ phân khu nào chưa dùng đến, cập nhật thông tin liên hệ và quản lý kho Công cụ AI, Skills, GitHub Repo, Bài viết & Video.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-blue-100 text-xs font-bold border border-blue-700/70 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Xuất file JSON</span>
          </button>

          <button
            type="button"
            onClick={resetToDefault}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-950/70 text-slate-300 hover:text-red-300 text-xs font-bold border border-slate-800 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi phục Mặc định</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Xem Trang Chủ</span>
          </Link>
        </div>
      </div>

      {/* Save Status Toast */}
      {(lastSavedMessage || isSaving) && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{isSaving ? "Đang lưu cấu hình..." : lastSavedMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b theme-border">
        <button
          type="button"
          onClick={() => setActiveTab("features")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "features"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <Power className="w-4 h-4" />
          <span>
            1. Bật/Tắt Tính Năng ({enabledFeatureCount}/{totalFeatureCount})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("brand")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "brand"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>2. Thương Hiệu & Liên Hệ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tools")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "tools"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>3. Công Cụ AI ({config.aiTools.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("skills")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "skills"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>4. Kho Skills ({config.skills.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("repos")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "repos"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <Github className="w-4 h-4" />
          <span>5. Kho GitHub Repo ({config.repos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "content"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>
            6. Bài Viết ({config.articles.length}) & Video ({config.videos.length})
          </span>
        </button>
      </div>

      {/* TAB 1: FEATURE TOGGLES */}
      {activeTab === "features" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl theme-surface border">
            <div>
              <h2 className="text-lg font-extrabold">
                Công Tắc Bật / Tắt Các Phân Khu Trên Website
              </h2>
              <p className="text-xs theme-text-muted mt-0.5">
                Tính năng nào bạn chưa cần dùng đến có thể tắt đi bằng 1 cú nhấp chuột; giao diện Trang chủ và Thanh điều hướng sẽ tự động ẩn mục đó.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleEnableAllFeatures}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Bật tất cả (17/17)
              </button>
              <button
                type="button"
                onClick={handleMinimalMode}
                className="px-3.5 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Chế độ Tinh gọn
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURE_META.map((item) => {
              const isEnabled = config.features[item.key];
              return (
                <div
                  key={item.key}
                  className={`p-5 rounded-2xl border transition flex items-start justify-between gap-4 ${
                    isEnabled
                      ? "theme-surface border-blue-800/80"
                      : "bg-slate-950/40 border-slate-800/60 opacity-75"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                        {item.group}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          isEnabled
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {isEnabled ? "Đang BẬT" : "Đang TẮT"}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm pt-1">{item.title}</h3>
                    <p className="text-xs theme-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFeature(item.key)}
                    aria-label={`Bật hoặc tắt ${item.title}`}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 transition cursor-pointer ${
                      isEnabled
                        ? "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
                        : "bg-slate-800 hover:bg-blue-800 text-slate-300"
                    }`}
                  >
                    {isEnabled ? "Tắt đi" : "Bật lên"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BRAND & CONTACT SETTINGS */}
      {activeTab === "brand" && (
        <form onSubmit={handleSaveBrand} className="space-y-8">
          <div className="theme-surface border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-extrabold text-orange-400">
              1. Thông Tin Thương Hiệu & Định Vị (Hero & Bio)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Tên thương hiệu hiển thị (Brand Name)
                </label>
                <input
                  type="text"
                  value={brandForm.brandName}
                  onChange={(e) =>
                    setBrandForm({ ...brandForm, brandName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Chức danh / Định vị chuyên gia (Role Title)
                </label>
                <input
                  type="text"
                  value={brandForm.roleTitle}
                  onChange={(e) =>
                    setBrandForm({ ...brandForm, roleTitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Huy hiệu uy tín trên Hero (Social Proof Badge)
                </label>
                <input
                  type="text"
                  value={brandForm.heroBadge}
                  onChange={(e) =>
                    setBrandForm({ ...brandForm, heroBadge: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Tiêu đề Hero (Dòng trên)
                </label>
                <input
                  type="text"
                  value={brandForm.heroTitlePrefix}
                  onChange={(e) =>
                    setBrandForm({ ...brandForm, heroTitlePrefix: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">
                Mô tả ngắn dưới tiêu đề Hero
              </label>
              <textarea
                rows={2}
                value={brandForm.heroSubtitle}
                onChange={(e) =>
                  setBrandForm({ ...brandForm, heroSubtitle: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">
                Câu châm ngôn / Triết lý AI (Motto)
              </label>
              <input
                type="text"
                value={brandForm.motto}
                onChange={(e) =>
                  setBrandForm({ ...brandForm, motto: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="theme-surface border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-extrabold text-blue-400">
              2. Thông Tin Liên Hệ & Kênh Mạng Xã Hội
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Email liên hệ</label>
                <input
                  type="email"
                  value={brandForm.contact.email}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Số điện thoại / Hotline
                </label>
                <input
                  type="text"
                  value={brandForm.contact.phone}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Link Zalo tư vấn</label>
                <input
                  type="text"
                  value={brandForm.contact.zaloUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, zaloUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Kênh YouTube</label>
                <input
                  type="text"
                  value={brandForm.contact.youtubeUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, youtubeUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Trang Facebook</label>
                <input
                  type="text"
                  value={brandForm.contact.facebookUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, facebookUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Trang GitHub</label>
                <input
                  type="text"
                  value={brandForm.contact.githubUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, githubUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Trang LinkedIn</label>
                <input
                  type="text"
                  value={brandForm.contact.linkedinUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, linkedinUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Kênh TikTok</label>
                <input
                  type="text"
                  value={brandForm.contact.tiktokUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, tiktokUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Địa chỉ</label>
                <input
                  type="text"
                  value={brandForm.contact.address}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      contact: { ...brandForm.contact, address: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>
            </div>
          </div>

          {/* Donation Info */}
          <div className="theme-surface border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-extrabold text-orange-400">
              3. Thông Tin Ngân Hàng / Ủng Hộ Cafe (VietQR)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Tên ngân hàng</label>
                <input
                  type="text"
                  value={brandForm.donationInfo.bankName}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      donationInfo: {
                        ...brandForm.donationInfo,
                        bankName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">Số tài khoản</label>
                <input
                  type="text"
                  value={brandForm.donationInfo.accountNumber}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      donationInfo: {
                        ...brandForm.donationInfo,
                        accountNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">Chủ tài khoản</label>
                <input
                  type="text"
                  value={brandForm.donationInfo.accountHolder}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      donationInfo: {
                        ...brandForm.donationInfo,
                        accountHolder: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Toàn Bộ Thông Tin Thương Hiệu & Liên Hệ</span>
          </button>
        </form>
      )}

      {/* TAB 3: AI TOOLS MANAGEMENT */}
      {activeTab === "tools" && (
        <div className="space-y-8">
          <form
            onSubmit={handleAddTool}
            className="theme-surface border rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-lg font-extrabold text-orange-400 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Thêm Công Cụ AI Mới
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                required
                placeholder="Tên công cụ (VD: Runway Gen-3)..."
                value={newTool.name}
                onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Danh mục (VD: Tạo Video AI)..."
                value={newTool.category}
                onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Đường dẫn URL (https://...)..."
                value={newTool.url}
                onChange={(e) => setNewTool({ ...newTool, url: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Huy hiệu (VD: Video Hot)..."
                value={newTool.badge}
                onChange={(e) => setNewTool({ ...newTool, badge: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="Mô tả ngắn gọn công dụng của công cụ..."
                value={newTool.description}
                onChange={(e) =>
                  setNewTool({ ...newTool, description: e.target.value })
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                + Thêm Công Cụ
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.aiTools.map((tool) => (
              <div
                key={tool.id}
                className="theme-surface border rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{tool.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs theme-text-muted line-clamp-1 mt-1">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        aiTools: config.aiTools.map((t) =>
                          t.id === tool.id ? { ...t, enabled: !t.enabled } : t
                        ),
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      tool.enabled
                        ? "bg-emerald-600/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tool.enabled ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        aiTools: config.aiTools.filter((t) => t.id !== tool.id),
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SKILLS & TEMPLATES MANAGEMENT */}
      {activeTab === "skills" && (
        <div className="space-y-8">
          <form
            onSubmit={handleAddSkill}
            className="theme-surface border rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-lg font-extrabold text-orange-400 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Thêm Skill / Prompt / AI Template Mới
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Mã định danh (VD: seo-content-agent)..."
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                required
                placeholder="Tiêu đề tiếng Việt..."
                value={newSkill.titleVi}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, titleVi: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <select
                value={newSkill.category}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    category: e.target.value as SkillTemplateItem["category"],
                  })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              >
                <option value="Skills">Skills</option>
                <option value="Agents">Agents</option>
                <option value="Prompts">Prompts</option>
                <option value="Commands">Commands</option>
                <option value="MCPs">MCPs</option>
                <option value="Workflows">Workflows</option>
                <option value="Templates">Templates</option>
              </select>
            </div>

            <input
              type="text"
              required
              placeholder="Mô tả ngắn gọn chức năng của Skill..."
              value={newSkill.description}
              onChange={(e) =>
                setNewSkill({ ...newSkill, description: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
            />

            <textarea
              rows={4}
              required
              placeholder="Nội dung System Prompt / Hướng dẫn cấu hình chi tiết..."
              value={newSkill.promptContent}
              onChange={(e) =>
                setNewSkill({ ...newSkill, promptContent: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm font-mono"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold cursor-pointer"
            >
              + Lưu Skill Vào Thư Viện
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.skills.map((sk) => (
              <div
                key={sk.id}
                className="theme-surface border rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-orange-400">
                      {sk.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-200">
                      {sk.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold mt-0.5">{sk.titleVi}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        skills: config.skills.map((s) =>
                          s.id === sk.id ? { ...s, enabled: !s.enabled } : s
                        ),
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      sk.enabled
                        ? "bg-emerald-600/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {sk.enabled ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        skills: config.skills.filter((s) => s.id !== sk.id),
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REPOS MANAGEMENT */}
      {activeTab === "repos" && (
        <div className="space-y-8">
          <form
            onSubmit={handleAddRepo}
            className="theme-surface border rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-lg font-extrabold text-orange-400 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Thêm GitHub Repo Mới Vào Kho Lưu Trữ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                required
                placeholder="Owner (VD: anthropics)..."
                value={newRepo.owner}
                onChange={(e) => setNewRepo({ ...newRepo, owner: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                required
                placeholder="Tên Repo (VD: claude-code)..."
                value={newRepo.name}
                onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Ngôn ngữ (VD: Python, TypeScript)..."
                value={newRepo.language}
                onChange={(e) =>
                  setNewRepo({ ...newRepo, language: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Link GitHub (https://github.com/...)..."
                value={newRepo.url}
                onChange={(e) => setNewRepo({ ...newRepo, url: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="Mô tả tính năng nổi bật của Repo..."
                value={newRepo.description}
                onChange={(e) =>
                  setNewRepo({ ...newRepo, description: e.target.value })
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                + Thêm Repo
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.repos.map((rp) => (
              <div
                key={rp.id}
                className="theme-surface border rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-mono font-bold text-sm text-blue-300">
                    {rp.owner}/{rp.name}
                  </div>
                  <p className="text-xs theme-text-muted line-clamp-1 mt-0.5">
                    {rp.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        repos: config.repos.map((r) =>
                          r.id === rp.id ? { ...r, enabled: !r.enabled } : r
                        ),
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      rp.enabled
                        ? "bg-emerald-600/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {rp.enabled ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateConfig({
                        ...config,
                        repos: config.repos.filter((r) => r.id !== rp.id),
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ARTICLES & VIDEOS MANAGEMENT */}
      {activeTab === "content" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Articles Column */}
          <div className="space-y-6">
            <form
              onSubmit={handleAddArticle}
              className="theme-surface border rounded-3xl p-6 space-y-4"
            >
              <h2 className="text-lg font-extrabold text-orange-400">
                + Đăng Bài Viết / Playbook Mới
              </h2>
              <input
                type="text"
                required
                placeholder="Tiêu đề bài viết..."
                value={newArticle.title}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                required
                placeholder="Tóm tắt ngắn (Summary)..."
                value={newArticle.summary}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, summary: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <textarea
                rows={4}
                placeholder="Nội dung chi tiết bài viết (hỗ trợ tiêu đề ## và đoạn văn)..."
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, content: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold cursor-pointer"
              >
                Đăng Bài Viết
              </button>
            </form>

            <div className="space-y-3">
              {config.articles.map((art) => (
                <div
                  key={art.id}
                  className="theme-surface border rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{art.title}</div>
                    <div className="text-xs theme-text-muted">
                      {art.category} · {art.publishedAt}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          ...config,
                          articles: config.articles.map((a) =>
                            a.id === art.id ? { ...a, enabled: !a.enabled } : a
                          ),
                        })
                      }
                      className={`px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                        art.enabled
                          ? "bg-emerald-600/20 text-emerald-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {art.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          ...config,
                          articles: config.articles.filter((a) => a.id !== art.id),
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-red-600/20 text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos Column */}
          <div className="space-y-6">
            <form
              onSubmit={handleAddVideo}
              className="theme-surface border rounded-3xl p-6 space-y-4"
            >
              <h2 className="text-lg font-extrabold text-blue-400">
                + Thêm Video Hướng Dẫn Mới
              </h2>
              <input
                type="text"
                required
                placeholder="Tiêu đề Video..."
                value={newVideo.title}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, title: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Danh mục (VD: Vibe Coding)..."
                  value={newVideo.category}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, category: e.target.value })
                  }
                  className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Thời lượng (VD: 25:10)..."
                  value={newVideo.duration}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, duration: e.target.value })
                  }
                  className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Link Video YouTube..."
                value={newVideo.youtubeUrl}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, youtubeUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                Thêm Video
              </button>
            </form>

            <div className="space-y-3">
              {config.videos.map((vid) => (
                <div
                  key={vid.id}
                  className="theme-surface border rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{vid.title}</div>
                    <div className="text-xs theme-text-muted">
                      {vid.category} · {vid.duration}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          ...config,
                          videos: config.videos.map((v) =>
                            v.id === vid.id ? { ...v, enabled: !v.enabled } : v
                          ),
                        })
                      }
                      className={`px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                        vid.enabled
                          ? "bg-emerald-600/20 text-emerald-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {vid.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          ...config,
                          videos: config.videos.filter((v) => v.id !== vid.id),
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-red-600/20 text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
