"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Pencil,
  X,
  Briefcase,
  Lock,
  KeyRound,
  LogOut,
  ShieldCheck,
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
  ServiceItem,
  CustomGptItem,
  CourseLevelItem,
  CommunityItem,
  CompetencyItem,
} from "@/types/site";

const SESSION_AUTH_KEY = "tomcat_ai_admin_authenticated_v1";

type AdminTab =
  | "features"
  | "brand"
  | "tools"
  | "skills"
  | "repos"
  | "content"
  | "services"
  | "security";

const FEATURE_META: {
  key: keyof FeatureFlags;
  title: string;
  description: string;
  group: "Trang chủ & Điều hướng" | "Kho Tài nguyên AI" | "Kết nối & Tiện ích nổi";
  targetTab: AdminTab;
}[] = [
  {
    key: "heroQuickPills",
    title: "Nút Truy Cập Nhanh Trên Hero (Quick Pills)",
    description: "Hàng nút lối tắt ngay dưới tiêu đề chính trên trang chủ.",
    group: "Trang chủ & Điều hướng",
    targetTab: "brand",
  },
  {
    key: "aboutSection",
    title: "Phân Khu Giới Thiệu Bản Thân & Năng Lực AI",
    description: "Khối ảnh diễn giả, câu chuyện thương hiệu TOM CAT AI và liên kết mạng xã hội.",
    group: "Trang chủ & Điều hướng",
    targetTab: "brand",
  },
  {
    key: "b2bServices",
    title: "Phân Khu Giải Pháp Doanh Nghiệp & Cá Nhân (B2B/B2C)",
    description: "Các gói Đào tạo AI In-house, Tư vấn AI Automation và Coaching 1-1.",
    group: "Trang chủ & Điều hướng",
    targetTab: "services",
  },
  {
    key: "aiTools",
    title: "Danh Bạ Công Cụ AI Khuyên Dùng (#tools)",
    description: "Khối tra cứu, tìm kiếm và lọc các công cụ AI phục vụ công việc.",
    group: "Kho Tài nguyên AI",
    targetTab: "tools",
  },
  {
    key: "skillsHub",
    title: "Thư Viện AI Skills & Templates (/skills)",
    description: "Phân khu trên trang chủ và trang thư viện Skills, Prompts, Subagents, MCPs.",
    group: "Kho Tài nguyên AI",
    targetTab: "skills",
  },
  {
    key: "repoVault",
    title: "Kho GitHub Repo Hàng Đầu (/kho-repo)",
    description: "Phân khu và trang danh bạ các dự án mã nguồn mở AI chọn lọc.",
    group: "Kho Tài nguyên AI",
    targetTab: "repos",
  },
  {
    key: "customGpts",
    title: "Bộ Custom GPT & AI Agent Độc Quyền (#gpt-doc-quyen)",
    description: "Danh sách các trợ lý GPT chuyên biệt do TOM CAT AI huấn luyện.",
    group: "Kho Tài nguyên AI",
    targetTab: "services",
  },
  {
    key: "latestVideos",
    title: "Phân Khu Video Hướng Dẫn Mới Nhất (#videos)",
    description: "Video tiêu điểm và lưới video hướng dẫn thực chiến trên trang chủ.",
    group: "Kho Tài nguyên AI",
    targetTab: "content",
  },
  {
    key: "freeCourse",
    title: "Khóa Học AI Miễn Phí 4 Cấp Độ (/khoa-hoc-ai)",
    description: "Lộ trình 18 bài học miễn phí trên trang chủ và trang khóa học riêng.",
    group: "Kho Tài nguyên AI",
    targetTab: "services",
  },
  {
    key: "memberVideos",
    title: "Phân Khu Video Chuyên Sâu / Hội Viên Pro",
    description: "Khối video case study nâng cao dành cho hội viên hoặc khách hàng Pro.",
    group: "Kho Tài nguyên AI",
    targetTab: "content",
  },
  {
    key: "articles",
    title: "Hệ Thống Bài Viết & Playbook Chuyên Sâu (/bai-viet)",
    description: "Phân khu bài viết trên trang chủ và chuyên trang đọc bài viết Blog.",
    group: "Kho Tài nguyên AI",
    targetTab: "content",
  },
  {
    key: "community",
    title: "Phân Khu Cộng Đồng AI Việt Nam (#community)",
    description: "Giới thiệu các nhóm Facebook Group / Discord giao lưu chia sẻ AI.",
    group: "Kết nối & Tiện ích nổi",
    targetTab: "services",
  },
  {
    key: "omnichannel",
    title: "Phân Khu Hiện Diện Đa Kênh (Omnichannel)",
    description: "Lưới thẻ liên kết tới YouTube, TikTok, Facebook, GitHub, LinkedIn, X.",
    group: "Kết nối & Tiện ích nổi",
    targetTab: "brand",
  },
  {
    key: "donation",
    title: "Phân Khu Ủng Hộ Cafe / Mã VietQR (#donate)",
    description: "Khối thông tin tài khoản ngân hàng và mã QR mời cafe.",
    group: "Kết nối & Tiện ích nổi",
    targetTab: "brand",
  },
  {
    key: "contactSection",
    title: "Phân Khu Liên Hệ Hợp Tác & Form Tư Vấn (#contact)",
    description: "Thông tin Email, Hotline/Zalo và biểu mẫu gửi yêu cầu tư vấn.",
    group: "Kết nối & Tiện ích nổi",
    targetTab: "brand",
  },
  {
    key: "floatingPromo",
    title: "Nút Nổi Góc Trái (Quảng Bá Bộ Skills Hot)",
    description: "Thẻ nổi cố định ở góc dưới bên trái màn hình dẫn tới sản phẩm chủ lực.",
    group: "Kết nối & Tiện ích nổi",
    targetTab: "brand",
  },
  {
    key: "floatingCoffee",
    title: "Nút Nổi Góc Phải (Ủng Hộ 1 Ly Cafe)",
    description: "Nút nổi cố định ở góc dưới bên phải màn hình cuộn nhanh tới phần ủng hộ/liên hệ.",
    group: "Kết nối & Tiện ích nổi",
    targetTab: "brand",
  },
];

function AdminBackendInner() {
  const {
    config,
    isLoaded,
    isSaving,
    lastSavedMessage,
    updateConfig,
    toggleFeature,
    resetToDefault,
  } = useSiteConfig();

  const searchParams = useSearchParams();
  const topEditorRef = useRef<HTMLDivElement | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newUsernameInput, setNewUsernameInput] = useState("admin");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [passChangeStatus, setPassChangeStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    try {
      const savedSession = sessionStorage.getItem(SESSION_AUTH_KEY);
      if (savedSession === "authenticated") {
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (config.adminAuth?.username) {
      setNewUsernameInput(config.adminAuth.username);
    }
  }, [config.adminAuth]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedUser = config.adminAuth?.username || "admin";
    const expectedPass = config.adminAuth?.password || "H@giang1989";

    if (
      loginUsername.trim() === expectedUser &&
      loginPassword === expectedPass
    ) {
      setIsAuthenticated(true);
      setLoginError(null);
      try {
        sessionStorage.setItem(SESSION_AUTH_KEY, "authenticated");
      } catch {
        // ignore
      }
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không chính xác!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPassword("");
    try {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const expectedPass = config.adminAuth?.password || "H@giang1989";

    if (currentPassInput !== expectedPass) {
      setPassChangeStatus({
        type: "error",
        text: "Mật khẩu hiện tại không đúng!",
      });
      return;
    }
    if (newPassInput.length < 6) {
      setPassChangeStatus({
        type: "error",
        text: "Mật khẩu mới phải có ít nhất 6 ký tự!",
      });
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPassChangeStatus({
        type: "error",
        text: "Mật khẩu xác nhận không khớp!",
      });
      return;
    }

    await updateConfig({
      ...config,
      adminAuth: {
        username: newUsernameInput.trim() || "admin",
        password: newPassInput,
      },
    });

    setCurrentPassInput("");
    setNewPassInput("");
    setConfirmPassInput("");
    setPassChangeStatus({
      type: "success",
      text: "Đã cập nhật mật khẩu quản trị thành công!",
    });
  };

  const [activeTab, setActiveTab] = useState<AdminTab>("features");

  // 1. Brand & Contact local editable form
  const [brandForm, setBrandForm] = useState(config.brand);
  useEffect(() => {
    setBrandForm(config.brand);
  }, [config.brand]);

  // 2. AI Tool Form (supports both Add New & Edit Existing)
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [toolForm, setToolForm] = useState({
    name: "",
    category: "Lập trình & Trợ lý AI",
    description: "",
    badge: "Mới",
    url: "https://",
    iconText: "AI",
    accentColor: "orange" as AiToolItem["accentColor"],
  });

  // 3. Skill Form (supports both Add New & Edit Existing)
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    titleVi: "",
    category: "Skills" as SkillTemplateItem["category"],
    tag: "Automation",
    downloadsCount: "1.250",
    level: "Thực chiến" as SkillTemplateItem["level"],
    description: "",
    installCommand: "npx tomcat-ai-skills@latest add skill ",
    promptContent: "",
    useCase: "",
  });

  // 4. Repo Form (supports both Add New & Edit Existing)
  const [editingRepoId, setEditingRepoId] = useState<string | null>(null);
  const [repoForm, setRepoForm] = useState({
    owner: "",
    name: "",
    topic: "AI Agents" as RepoItem["topic"],
    stars: "10.5k",
    forks: "1.2k",
    language: "TypeScript",
    description: "",
    highlights: "Open Source, Thực chiến AI",
    url: "https://github.com/",
  });

  // 5. Article Form (supports both Add New & Edit Existing)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Chiến lược AI & Agent",
    summary: "",
    publishedAt: new Date().toLocaleDateString("vi-VN"),
    readTime: "8 phút đọc",
    tags: "AI, Automation, TOM CAT AI",
    content: "",
  });

  // 6. Video Form (supports both Add New & Edit Existing)
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState({
    title: "",
    category: "Vibe Coding",
    duration: "20:00",
    views: "15.2K lượt xem",
    publishedAt: "Mới nhất",
    youtubeUrl: "https://youtube.com/@tomcatai",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    description: "",
    isFeatured: false,
    isMemberOnly: false,
  });

  // 7. Services / GPTs / Courses / Communities / Competencies editing states
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    targetAudience: "Doanh nghiệp (B2B)" as ServiceItem["targetAudience"],
    badge: "B2B Popular",
    description: "",
    deliverables: "",
    ctaLabel: "Nhận tư vấn ngay",
    ctaLink: "#contact",
  });

  const [editingGptId, setEditingGptId] = useState<string | null>(null);
  const [gptForm, setGptForm] = useState({
    name: "",
    category: "Vibe Coding",
    badge: "Độc quyền",
    description: "",
    capabilities: "",
    accessUrl: "https://chatgpt.com",
    demoVideoUrl: "https://youtube.com/@tomcatai",
  });

  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState({
    badge: "Cấp Độ 1 · Nhập Môn",
    title: "",
    subtitle: "",
    duration: "1 giờ 45 phút",
    lessonsText: "",
  });

  const [editingCommunityId, setEditingCommunityId] = useState<string | null>(null);
  const [communityForm, setCommunityForm] = useState({
    name: "",
    platform: "Facebook Group",
    membersCount: "50.000+ thành viên",
    description: "",
    url: "https://facebook.com/groups/tomcatai",
  });

  const [editingCompId, setEditingCompId] = useState<string | null>(null);
  const [compForm, setCompForm] = useState({
    title: "",
    itemsText: "",
  });

  const scrollToEditor = () => {
    setTimeout(() => {
      topEditorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  // --- TOOL CRUD ---
  const startEditTool = (tool: AiToolItem) => {
    setActiveTab("tools");
    setEditingToolId(tool.id);
    setToolForm({
      name: tool.name,
      category: tool.category,
      description: tool.description,
      badge: tool.badge || "",
      url: tool.url,
      iconText: tool.iconText,
      accentColor: tool.accentColor,
    });
    scrollToEditor();
  };

  // --- SKILL CRUD ---
  const startEditSkill = (sk: SkillTemplateItem) => {
    setActiveTab("skills");
    setEditingSkillId(sk.id);
    setSkillForm({
      name: sk.name,
      titleVi: sk.titleVi,
      category: sk.category,
      tag: sk.tag,
      downloadsCount: sk.downloadsCount,
      level: sk.level,
      description: sk.description,
      installCommand: sk.installCommand,
      promptContent: sk.promptContent,
      useCase: sk.useCase,
    });
    scrollToEditor();
  };

  // --- REPO CRUD ---
  const startEditRepo = (rp: RepoItem) => {
    setActiveTab("repos");
    setEditingRepoId(rp.id);
    setRepoForm({
      owner: rp.owner,
      name: rp.name,
      topic: rp.topic,
      stars: rp.stars,
      forks: rp.forks,
      language: rp.language,
      description: rp.description,
      highlights: rp.highlights.join(", "),
      url: rp.url,
    });
    scrollToEditor();
  };

  // --- ARTICLE CRUD ---
  const startEditArticle = (art: ArticleItem) => {
    setActiveTab("content");
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      summary: art.summary,
      publishedAt: art.publishedAt,
      readTime: art.readTime,
      tags: art.tags.join(", "),
      content: art.content,
    });
    scrollToEditor();
  };

  // --- VIDEO CRUD ---
  const startEditVideo = (vid: VideoItem) => {
    setActiveTab("content");
    setEditingVideoId(vid.id);
    setVideoForm({
      title: vid.title,
      category: vid.category,
      duration: vid.duration,
      views: vid.views,
      publishedAt: vid.publishedAt,
      youtubeUrl: vid.youtubeUrl,
      thumbnailUrl: vid.thumbnailUrl,
      description: vid.description,
      isFeatured: Boolean(vid.isFeatured),
      isMemberOnly: Boolean(vid.isMemberOnly),
    });
    scrollToEditor();
  };

  // --- SERVICE / GPT / COURSE / COMMUNITY EDITING ---
  const startEditService = (srv: ServiceItem) => {
    setActiveTab("services");
    setEditingServiceId(srv.id);
    setServiceForm({
      title: srv.title,
      targetAudience: srv.targetAudience,
      badge: srv.badge,
      description: srv.description,
      deliverables: srv.deliverables.join("\n"),
      ctaLabel: srv.ctaLabel,
      ctaLink: srv.ctaLink,
    });
    scrollToEditor();
  };

  const startEditGpt = (gpt: CustomGptItem) => {
    setActiveTab("services");
    setEditingGptId(gpt.id);
    setGptForm({
      name: gpt.name,
      category: gpt.category,
      badge: gpt.badge,
      description: gpt.description,
      capabilities: gpt.capabilities.join("\n"),
      accessUrl: gpt.accessUrl,
      demoVideoUrl: gpt.demoVideoUrl,
    });
    scrollToEditor();
  };

  const startEditCourse = (lvl: CourseLevelItem) => {
    setActiveTab("services");
    setEditingCourseId(lvl.id);
    setCourseForm({
      badge: lvl.badge,
      title: lvl.title,
      subtitle: lvl.subtitle,
      duration: lvl.duration,
      lessonsText: lvl.lessons
        .map((l) => `${l.number} | ${l.title} | ${l.duration} | ${l.videoUrl}`)
        .join("\n"),
    });
  };

  const startEditCommunity = (com: CommunityItem) => {
    setActiveTab("services");
    setEditingCommunityId(com.id);
    setCommunityForm({
      name: com.name,
      platform: com.platform,
      membersCount: com.membersCount,
      description: com.description,
      url: com.url,
    });
  };

  const startEditComp = (comp: CompetencyItem) => {
    setActiveTab("services");
    setEditingCompId(comp.id);
    setCompForm({
      title: comp.title,
      itemsText: comp.items.join("\n"),
    });
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab") as AdminTab | null;
    if (
      tabParam &&
      [
        "features",
        "brand",
        "tools",
        "skills",
        "repos",
        "content",
        "services",
        "security",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

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

  const resetToolForm = () => {
    setEditingToolId(null);
    setToolForm({
      name: "",
      category: "Lập trình & Trợ lý AI",
      description: "",
      badge: "Mới",
      url: "https://",
      iconText: "AI",
      accentColor: "orange",
    });
  };

  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolForm.name.trim()) return;
    if (editingToolId) {
      await updateConfig({
        ...config,
        aiTools: config.aiTools.map((t) =>
          t.id === editingToolId
            ? {
                ...t,
                name: toolForm.name,
                category: toolForm.category,
                description: toolForm.description,
                badge: toolForm.badge,
                url: toolForm.url,
                iconText: toolForm.iconText || "AI",
                accentColor: toolForm.accentColor,
              }
            : t
        ),
      });
    } else {
      const item: AiToolItem = {
        id: `tool-${Date.now()}`,
        name: toolForm.name,
        category: toolForm.category,
        description: toolForm.description,
        badge: toolForm.badge,
        url: toolForm.url,
        iconText: toolForm.iconText || "AI",
        accentColor: toolForm.accentColor,
        featured: true,
        enabled: true,
      };
      await updateConfig({
        ...config,
        aiTools: [item, ...config.aiTools],
      });
    }
    resetToolForm();
  };

  const resetSkillForm = () => {
    setEditingSkillId(null);
    setSkillForm({
      name: "",
      titleVi: "",
      category: "Skills",
      tag: "Automation",
      downloadsCount: "1.250",
      level: "Thực chiến",
      description: "",
      installCommand: "npx tomcat-ai-skills@latest add skill ",
      promptContent: "",
      useCase: "",
    });
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim() || !skillForm.titleVi.trim()) return;
    if (editingSkillId) {
      await updateConfig({
        ...config,
        skills: config.skills.map((s) =>
          s.id === editingSkillId
            ? {
                ...s,
                name: skillForm.name,
                titleVi: skillForm.titleVi,
                category: skillForm.category,
                tag: skillForm.tag,
                downloadsCount: skillForm.downloadsCount,
                level: skillForm.level,
                description: skillForm.description,
                installCommand: skillForm.installCommand,
                promptContent: skillForm.promptContent,
                useCase: skillForm.useCase,
              }
            : s
        ),
      });
    } else {
      const item: SkillTemplateItem = {
        id: `sk-${Date.now()}`,
        slug: skillForm.name.toLowerCase().replace(/\s+/g, "-"),
        name: skillForm.name,
        titleVi: skillForm.titleVi,
        category: skillForm.category,
        tag: skillForm.tag,
        downloadsCount: skillForm.downloadsCount || "1.250",
        description: skillForm.description,
        installCommand: skillForm.installCommand,
        promptContent: skillForm.promptContent,
        useCase: skillForm.useCase || "Ứng dụng trực tiếp vào dự án AI thực tế.",
        level: skillForm.level,
        isHot: true,
        priceLabel: "Miễn phí",
        enabled: true,
      };
      await updateConfig({
        ...config,
        skills: [item, ...config.skills],
      });
    }
    resetSkillForm();
  };

  const resetRepoForm = () => {
    setEditingRepoId(null);
    setRepoForm({
      owner: "",
      name: "",
      topic: "AI Agents",
      stars: "10.5k",
      forks: "1.2k",
      language: "TypeScript",
      description: "",
      highlights: "Open Source, Thực chiến AI",
      url: "https://github.com/",
    });
  };

  const handleSaveRepo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoForm.name.trim()) return;
    const parsedHighlights = repoForm.highlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingRepoId) {
      await updateConfig({
        ...config,
        repos: config.repos.map((r) =>
          r.id === editingRepoId
            ? {
                ...r,
                owner: repoForm.owner,
                name: repoForm.name,
                topic: repoForm.topic,
                stars: repoForm.stars,
                forks: repoForm.forks,
                language: repoForm.language,
                description: repoForm.description,
                highlights: parsedHighlights,
                url: repoForm.url,
              }
            : r
        ),
      });
    } else {
      const item: RepoItem = {
        id: `repo-${Date.now()}`,
        owner: repoForm.owner || "tomcatai",
        name: repoForm.name,
        topic: repoForm.topic,
        stars: repoForm.stars,
        forks: repoForm.forks || "1.2k",
        language: repoForm.language,
        description: repoForm.description,
        highlights: parsedHighlights.length ? parsedHighlights : ["Open Source"],
        url: repoForm.url,
        isFeatured: true,
        enabled: true,
      };
      await updateConfig({
        ...config,
        repos: [item, ...config.repos],
      });
    }
    resetRepoForm();
  };

  const resetArticleForm = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: "",
      category: "Chiến lược AI & Agent",
      summary: "",
      publishedAt: new Date().toLocaleDateString("vi-VN"),
      readTime: "8 phút đọc",
      tags: "AI, Automation, TOM CAT AI",
      content: "",
    });
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) return;
    const parsedTags = articleForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingArticleId) {
      await updateConfig({
        ...config,
        articles: config.articles.map((a) =>
          a.id === editingArticleId
            ? {
                ...a,
                title: articleForm.title,
                category: articleForm.category,
                summary: articleForm.summary,
                publishedAt: articleForm.publishedAt,
                readTime: articleForm.readTime,
                tags: parsedTags,
                content: articleForm.content,
              }
            : a
        ),
      });
    } else {
      const slug = articleForm.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const item: ArticleItem = {
        id: `art-${Date.now()}`,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        title: articleForm.title,
        category: articleForm.category,
        summary: articleForm.summary,
        publishedAt: articleForm.publishedAt,
        readTime: articleForm.readTime,
        author: config.brand.brandName,
        coverGradient: "from-blue-900 via-slate-900 to-orange-600",
        tags: parsedTags,
        content: articleForm.content || articleForm.summary,
        isFeatured: true,
        enabled: true,
      };
      await updateConfig({
        ...config,
        articles: [item, ...config.articles],
      });
    }
    resetArticleForm();
  };

  const resetVideoForm = () => {
    setEditingVideoId(null);
    setVideoForm({
      title: "",
      category: "Vibe Coding",
      duration: "20:00",
      views: "15.2K lượt xem",
      publishedAt: "Mới nhất",
      youtubeUrl: "https://youtube.com/@tomcatai",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      description: "",
      isFeatured: false,
      isMemberOnly: false,
    });
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title.trim()) return;
    if (editingVideoId) {
      await updateConfig({
        ...config,
        videos: config.videos.map((v) =>
          v.id === editingVideoId
            ? {
                ...v,
                title: videoForm.title,
                category: videoForm.category,
                duration: videoForm.duration,
                views: videoForm.views,
                publishedAt: videoForm.publishedAt,
                youtubeUrl: videoForm.youtubeUrl,
                thumbnailUrl: videoForm.thumbnailUrl,
                description: videoForm.description,
                isFeatured: videoForm.isFeatured,
                isMemberOnly: videoForm.isMemberOnly,
              }
            : v
        ),
      });
    } else {
      const item: VideoItem = {
        id: `vid-${Date.now()}`,
        title: videoForm.title,
        category: videoForm.category,
        duration: videoForm.duration,
        views: videoForm.views || "Mới đăng",
        publishedAt: videoForm.publishedAt || "Hôm nay",
        thumbnailUrl: videoForm.thumbnailUrl,
        youtubeUrl: videoForm.youtubeUrl,
        youtubeEmbedId: "dQw4w9WgXcQ",
        description: videoForm.description,
        isFeatured: videoForm.isFeatured,
        isMemberOnly: videoForm.isMemberOnly,
        enabled: true,
      };
      await updateConfig({
        ...config,
        videos: [item, ...config.videos],
      });
    }
    resetVideoForm();
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) return;
    const deliverables = serviceForm.deliverables
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingServiceId) {
      await updateConfig({
        ...config,
        services: config.services.map((s) =>
          s.id === editingServiceId
            ? {
                ...s,
                title: serviceForm.title,
                targetAudience: serviceForm.targetAudience,
                badge: serviceForm.badge,
                description: serviceForm.description,
                deliverables,
                ctaLabel: serviceForm.ctaLabel,
                ctaLink: serviceForm.ctaLink,
              }
            : s
        ),
      });
    } else {
      const item: ServiceItem = {
        id: `srv-${Date.now()}`,
        title: serviceForm.title,
        targetAudience: serviceForm.targetAudience,
        badge: serviceForm.badge,
        description: serviceForm.description,
        deliverables,
        ctaLabel: serviceForm.ctaLabel,
        ctaLink: serviceForm.ctaLink,
        enabled: true,
      };
      await updateConfig({
        ...config,
        services: [...config.services, item],
      });
    }
    setEditingServiceId(null);
    setServiceForm({
      title: "",
      targetAudience: "Doanh nghiệp (B2B)",
      badge: "B2B Popular",
      description: "",
      deliverables: "",
      ctaLabel: "Nhận tư vấn ngay",
      ctaLink: "#contact",
    });
  };

  const handleSaveGpt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gptForm.name.trim()) return;
    const capabilities = gptForm.capabilities
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingGptId) {
      await updateConfig({
        ...config,
        customGpts: config.customGpts.map((g) =>
          g.id === editingGptId
            ? {
                ...g,
                name: gptForm.name,
                category: gptForm.category,
                badge: gptForm.badge,
                description: gptForm.description,
                capabilities,
                accessUrl: gptForm.accessUrl,
                demoVideoUrl: gptForm.demoVideoUrl,
              }
            : g
        ),
      });
    } else {
      const item: CustomGptItem = {
        id: `gpt-${Date.now()}`,
        name: gptForm.name,
        category: gptForm.category,
        badge: gptForm.badge,
        description: gptForm.description,
        capabilities,
        accessUrl: gptForm.accessUrl,
        demoVideoUrl: gptForm.demoVideoUrl,
        enabled: true,
      };
      await updateConfig({
        ...config,
        customGpts: [...config.customGpts, item],
      });
    }
    setEditingGptId(null);
    setGptForm({
      name: "",
      category: "Vibe Coding",
      badge: "Độc quyền",
      description: "",
      capabilities: "",
      accessUrl: "https://chatgpt.com",
      demoVideoUrl: "https://youtube.com/@tomcatai",
    });
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourseId) return;
    const parsedLessons = courseForm.lessonsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, i) => {
        const parts = line.split("|").map((p) => p.trim());
        return {
          number: parts[0] || `Bài ${i + 1}`,
          title: parts[1] || parts[0] || "Bài học AI",
          duration: parts[2] || "20:00",
          videoUrl: parts[3] || "https://youtube.com/@tomcatai",
          isFree: true,
        };
      });

    await updateConfig({
      ...config,
      courseLevels: config.courseLevels.map((c) =>
        c.id === editingCourseId
          ? {
              ...c,
              badge: courseForm.badge,
              title: courseForm.title,
              subtitle: courseForm.subtitle,
              duration: courseForm.duration,
              lessonsCount: parsedLessons.length || c.lessonsCount,
              lessons: parsedLessons.length ? parsedLessons : c.lessons,
            }
          : c
      ),
    });
    setEditingCourseId(null);
  };

  const handleSaveCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunityId) return;
    await updateConfig({
      ...config,
      communities: config.communities.map((c) =>
        c.id === editingCommunityId
          ? {
              ...c,
              name: communityForm.name,
              platform: communityForm.platform,
              membersCount: communityForm.membersCount,
              description: communityForm.description,
              url: communityForm.url,
            }
          : c
      ),
    });
    setEditingCommunityId(null);
  };

  const handleSaveComp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompId) return;
    const items = compForm.itemsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    await updateConfig({
      ...config,
      competencies: (config.competencies || []).map((c) =>
        c.id === editingCompId ? { ...c, title: compForm.title, items } : c
      ),
    });
    setEditingCompId(null);
  };

  const enabledFeatureCount = Object.values(config.features).filter(Boolean).length;
  const totalFeatureCount = Object.keys(config.features).length;

  if (!authChecked || !isLoaded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-sm font-semibold theme-text-muted">
          Đang kiểm tra phiên đăng nhập Quản trị...
        </div>
      </div>
    );
  }

  // PASSWORD GATE: Only authenticated admin can access /admin
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#08142c] via-[#050811] to-[#1a0f07] border border-blue-800/80 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-600/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white pt-2">
              Đăng Nhập Quản Trị
            </h1>
            <p className="text-xs text-slate-400">
              Hệ thống Backend Quản trị {config.brand.brandName}. Vui lòng nhập tài khoản và mật khẩu quản trị viên.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Tên đăng nhập (Username)
              </label>
              <input
                type="text"
                required
                autoFocus
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl bg-[#0b152c] border border-blue-800/80 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Mật khẩu (Password)
              </label>
              <div className="relative">
                <input
                  type={showLoginPass ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Nhập mật khẩu quản trị..."
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#0b152c] border border-blue-800/80 text-white text-sm focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showLoginPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-bold text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition cursor-pointer"
            >
              Đăng Nhập Vào Trang Quản Trị
            </button>
          </form>

          <div className="pt-4 border-t border-blue-900/60 text-center">
            <Link
              href="/"
              className="text-xs text-blue-300 hover:text-orange-400 font-semibold"
            >
              ← Quay về Trang chủ {config.brand.brandName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={topEditorRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#08142c] via-[#050811] to-[#1f1108] border border-blue-800/80 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>BACKEND QUẢN TRỊ ĐÃ XÁC THỰC · {config.brand.brandName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Quản Trị Tính Năng & Chỉnh Sửa Toàn Bộ Nội Dung
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Tại đây bạn có thể bật/tắt 17 module của website, chỉnh sửa từng mục nội dung bằng nút <strong className="text-orange-400">✎ Sửa</strong> và đổi mật khẩu quản trị.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-orange-300 text-xs font-bold border border-orange-500/40 transition cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Đổi Mật Khẩu</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-blue-100 text-xs font-bold border border-blue-700/70 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Xuất JSON</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Xem Trang Chủ</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-800 text-red-200 text-xs font-bold border border-red-700/60 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
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
            1. Bật/Tắt & Sửa Module ({enabledFeatureCount}/{totalFeatureCount})
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
          <span>2. Thương Hiệu, Bio & Liên Hệ</span>
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

        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "services"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>7. Dịch Vụ B2B, GPT, Khóa Học & Giới Thiệu</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer ${
            activeTab === "security"
              ? "bg-orange-600 text-white shadow-md"
              : "theme-surface border hover:border-orange-500"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>8. Đổi Mật Khẩu</span>
        </button>
      </div>

      {/* TAB 1: FEATURE TOGGLES + DIRECT EDIT BUTTON ON EVERY MODULE */}
      {activeTab === "features" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl theme-surface border">
            <div>
              <h2 className="text-lg font-extrabold">
                Danh Sách 17 Phân Khu — Bấm &ldquo;✎ Sửa nội dung&rdquo; Hoặc &ldquo;Bật/Tắt&rdquo;
              </h2>
              <p className="text-xs theme-text-muted mt-0.5">
                Bấm nút màu xanh <strong className="text-blue-400">✎ Sửa nội dung</strong> ở bất kỳ phân khu nào để mở ngay trình chỉnh sửa chi tiết cho phân khu đó.
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
              <button
                type="button"
                onClick={resetToDefault}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-900 text-slate-200 text-xs font-bold transition cursor-pointer"
              >
                Khôi phục Mặc định
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURE_META.map((item) => {
              const isEnabled = config.features[item.key];
              return (
                <div
                  key={item.key}
                  className={`p-5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
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

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(item.targetTab);
                        scrollToEditor();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-extrabold shadow-md transition cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-orange-300" />
                      <span>Sửa nội dung</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFeature(item.key)}
                      aria-label={`Bật hoặc tắt ${item.title}`}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold shrink-0 transition cursor-pointer ${
                        isEnabled
                          ? "bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
                          : "bg-slate-800 hover:bg-blue-800 text-slate-300"
                      }`}
                    >
                      {isEnabled ? "Tắt đi" : "Bật lên"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BRAND, BIO, STATS & CONTACT SETTINGS */}
      {activeTab === "brand" && (
        <form onSubmit={handleSaveBrand} className="space-y-8">
          <div className="theme-surface border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-extrabold text-orange-400">
              1. Thông Tin Thương Hiệu, Hero & Câu Chuyện Giới Thiệu (Bio)
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
                  Tiêu đề Hero (Dòng trên & Dòng nổi bật)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={brandForm.heroTitlePrefix}
                    onChange={(e) =>
                      setBrandForm({
                        ...brandForm,
                        heroTitlePrefix: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl theme-elevated border text-sm"
                  />
                  <input
                    type="text"
                    value={brandForm.heroTitleHighlight}
                    onChange={(e) =>
                      setBrandForm({
                        ...brandForm,
                        heroTitleHighlight: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl theme-elevated border text-sm font-bold text-orange-400"
                  />
                </div>
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

            <div>
              <label className="block text-xs font-bold mb-1.5">
                Nội dung Giới thiệu bản thân (Bio — mỗi đoạn cách nhau bởi 1 dòng trống, hiển thị ở Trang chủ & Trang /about)
              </label>
              <textarea
                rows={5}
                value={brandForm.bioParagraphs.join("\n\n")}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    bioParagraphs: e.target.value
                      .split(/\n\s*\n/)
                      .map((p) => p.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Link Ảnh Diễn Giả / Sự Kiện (Speaker Image URL)
                </label>
                <input
                  type="text"
                  value={brandForm.speakerImageUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      speakerImageUrl: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  Nút Quảng Bá Nổi Góc Trái (Tiêu đề & Đường dẫn)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={brandForm.floatingPromoInfo.title}
                    onChange={(e) =>
                      setBrandForm({
                        ...brandForm,
                        floatingPromoInfo: {
                          ...brandForm.floatingPromoInfo,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl theme-elevated border text-sm"
                  />
                  <input
                    type="text"
                    value={brandForm.floatingPromoInfo.link}
                    onChange={(e) =>
                      setBrandForm({
                        ...brandForm,
                        floatingPromoInfo: {
                          ...brandForm.floatingPromoInfo,
                          link: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl theme-elevated border text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Stats Editor */}
            <div>
              <label className="block text-xs font-bold mb-2 text-blue-400">
                4 Ô Số Liệu Thống Kê Trên Hero & Trang Giới Thiệu
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {brandForm.stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl theme-elevated border space-y-2"
                  >
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const nextStats = [...brandForm.stats];
                        nextStats[idx] = { ...st, value: e.target.value };
                        setBrandForm({ ...brandForm, stats: nextStats });
                      }}
                      placeholder="Con số (VD: 2.050+)"
                      className="w-full px-2.5 py-1.5 rounded-lg theme-surface border text-sm font-extrabold text-orange-400"
                    />
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const nextStats = [...brandForm.stats];
                        nextStats[idx] = { ...st, label: e.target.value };
                        setBrandForm({ ...brandForm, stats: nextStats });
                      }}
                      placeholder="Nhãn mô tả"
                      className="w-full px-2.5 py-1.5 rounded-lg theme-surface border text-xs"
                    />
                  </div>
                ))}
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div>
                <label className="block text-xs font-bold mb-1.5">Link Ảnh Mã QR</label>
                <input
                  type="text"
                  value={brandForm.donationInfo.qrImageUrl}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      donationInfo: {
                        ...brandForm.donationInfo,
                        qrImageUrl: e.target.value,
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
            <span>Lưu Toàn Bộ Thông Tin Thương Hiệu, Bio & Liên Hệ</span>
          </button>
        </form>
      )}

      {/* TAB 3: AI TOOLS MANAGEMENT */}
      {activeTab === "tools" && (
        <div className="space-y-8">
          <form
            onSubmit={handleSaveTool}
            className={`theme-surface border rounded-3xl p-6 space-y-4 ${
              editingToolId ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-orange-400 flex items-center gap-2">
                {editingToolId ? (
                  <>
                    <Pencil className="w-5 h-5" />
                    <span>Đang Chỉnh Sửa Công Cụ AI</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Thêm Công Cụ AI Mới</span>
                  </>
                )}
              </h2>
              {editingToolId && (
                <button
                  type="button"
                  onClick={resetToolForm}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Hủy sửa
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="text"
                required
                placeholder="Tên công cụ (VD: Runway Gen-3)..."
                value={toolForm.name}
                onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Danh mục (VD: Tạo Video AI)..."
                value={toolForm.category}
                onChange={(e) =>
                  setToolForm({ ...toolForm, category: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Đường dẫn URL (https://...)..."
                value={toolForm.url}
                onChange={(e) => setToolForm({ ...toolForm, url: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Huy hiệu (VD: Video Hot)..."
                value={toolForm.badge}
                onChange={(e) =>
                  setToolForm({ ...toolForm, badge: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                maxLength={3}
                placeholder="Ký hiệu Icon (VD: AI, CL)..."
                value={toolForm.iconText}
                onChange={(e) =>
                  setToolForm({ ...toolForm, iconText: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm font-mono"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="Mô tả ngắn gọn công dụng của công cụ..."
                value={toolForm.description}
                onChange={(e) =>
                  setToolForm({ ...toolForm, description: e.target.value })
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                {editingToolId ? "Lưu Cập Nhật Công Cụ" : "+ Thêm Công Cụ"}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.aiTools.map((tool) => (
              <div
                key={tool.id}
                className={`theme-surface border rounded-2xl p-4 flex items-center justify-between gap-4 ${
                  editingToolId === tool.id ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">{tool.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                      {tool.category}
                    </span>
                    {tool.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs theme-text-muted line-clamp-1 mt-1">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEditTool(tool)}
                    className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold transition cursor-pointer inline-flex items-center gap-1 shadow"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Sửa</span>
                  </button>
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
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
                    className="px-2.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition cursor-pointer"
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
            onSubmit={handleSaveSkill}
            className={`theme-surface border rounded-3xl p-6 space-y-4 ${
              editingSkillId ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-orange-400 flex items-center gap-2">
                {editingSkillId ? (
                  <>
                    <Pencil className="w-5 h-5" />
                    <span>Đang Chỉnh Sửa Skill / AI Template</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Thêm Skill / Prompt / AI Template Mới</span>
                  </>
                )}
              </h2>
              {editingSkillId && (
                <button
                  type="button"
                  onClick={resetSkillForm}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Hủy sửa
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                required
                placeholder="Mã định danh (VD: seo-content-agent)..."
                value={skillForm.name}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, name: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm font-mono"
              />
              <input
                type="text"
                required
                placeholder="Tiêu đề tiếng Việt..."
                value={skillForm.titleVi}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, titleVi: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <select
                value={skillForm.category}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
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
              <input
                type="text"
                placeholder="Nhãn Tag (VD: Creative Design)..."
                value={skillForm.tag}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, tag: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Mô tả ngắn gọn chức năng của Skill..."
                value={skillForm.description}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, description: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Lệnh cài đặt CLI (npx ...)"
                value={skillForm.installCommand}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, installCommand: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm font-mono"
              />
            </div>

            <textarea
              rows={4}
              required
              placeholder="Nội dung System Prompt / Hướng dẫn cấu hình chi tiết..."
              value={skillForm.promptContent}
              onChange={(e) =>
                setSkillForm({ ...skillForm, promptContent: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm font-mono"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Ứng dụng thực tế (Use case)..."
                value={skillForm.useCase}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, useCase: e.target.value })
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                {editingSkillId ? "Lưu Cập Nhật Skill" : "+ Lưu Skill Vào Thư Viện"}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.skills.map((sk) => (
              <div
                key={sk.id}
                className={`theme-surface border rounded-2xl p-4 flex items-center justify-between gap-4 ${
                  editingSkillId === sk.id ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-orange-400">
                      {sk.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-200">
                      {sk.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold mt-0.5 truncate">{sk.titleVi}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEditSkill(sk)}
                    className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold transition cursor-pointer inline-flex items-center gap-1 shadow"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Sửa</span>
                  </button>
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
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
                    className="px-2.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition cursor-pointer"
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
            onSubmit={handleSaveRepo}
            className={`theme-surface border rounded-3xl p-6 space-y-4 ${
              editingRepoId ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-orange-400 flex items-center gap-2">
                {editingRepoId ? (
                  <>
                    <Pencil className="w-5 h-5" />
                    <span>Đang Chỉnh Sửa GitHub Repo</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Thêm GitHub Repo Mới Vào Kho Lưu Trữ</span>
                  </>
                )}
              </h2>
              {editingRepoId && (
                <button
                  type="button"
                  onClick={resetRepoForm}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Hủy sửa
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="text"
                required
                placeholder="Owner (VD: anthropics)..."
                value={repoForm.owner}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, owner: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                required
                placeholder="Tên Repo (VD: claude-code)..."
                value={repoForm.name}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, name: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <select
                value={repoForm.topic}
                onChange={(e) =>
                  setRepoForm({
                    ...repoForm,
                    topic: e.target.value as RepoItem["topic"],
                  })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              >
                <option value="AI Agents">AI Agents</option>
                <option value="Vibe Coding">Vibe Coding</option>
                <option value="Automation">Automation</option>
                <option value="RAG & LLM">RAG & LLM</option>
                <option value="MCP & Tools">MCP & Tools</option>
                <option value="Prompt Engineering">Prompt Engineering</option>
                <option value="Video & Audio AI">Video & Audio AI</option>
              </select>
              <input
                type="text"
                placeholder="Số sao (VD: 50.2k)..."
                value={repoForm.stars}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, stars: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Ngôn ngữ (VD: Python)..."
                value={repoForm.language}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, language: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Link GitHub (https://github.com/...)..."
                value={repoForm.url}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, url: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Điểm nổi bật (ngăn cách bằng dấu phẩy)..."
                value={repoForm.highlights}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, highlights: e.target.value })
                }
                className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="Mô tả tính năng nổi bật của Repo..."
                value={repoForm.description}
                onChange={(e) =>
                  setRepoForm({ ...repoForm, description: e.target.value })
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                {editingRepoId ? "Lưu Cập Nhật Repo" : "+ Thêm Repo"}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.repos.map((rp) => (
              <div
                key={rp.id}
                className={`theme-surface border rounded-2xl p-4 flex items-center justify-between gap-4 ${
                  editingRepoId === rp.id ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="font-mono font-bold text-sm text-blue-300">
                    {rp.owner}/{rp.name}
                  </div>
                  <p className="text-xs theme-text-muted line-clamp-1 mt-0.5">
                    {rp.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEditRepo(rp)}
                    className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold transition cursor-pointer inline-flex items-center gap-1 shadow"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Sửa</span>
                  </button>
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
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
                    className="px-2.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition cursor-pointer"
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
              onSubmit={handleSaveArticle}
              className={`theme-surface border rounded-3xl p-6 space-y-4 ${
                editingArticleId ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-orange-400">
                  {editingArticleId
                    ? "✎ Đang Chỉnh Sửa Bài Viết"
                    : "+ Đăng Bài Viết / Playbook Mới"}
                </h2>
                {editingArticleId && (
                  <button
                    type="button"
                    onClick={resetArticleForm}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Hủy sửa
                  </button>
                )}
              </div>

              <input
                type="text"
                required
                placeholder="Tiêu đề bài viết..."
                value={articleForm.title}
                onChange={(e) =>
                  setArticleForm({ ...articleForm, title: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Danh mục..."
                  value={articleForm.category}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, category: e.target.value })
                  }
                  className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Từ khóa (cách nhau dấu phẩy)..."
                  value={articleForm.tags}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, tags: e.target.value })
                  }
                  className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Tóm tắt ngắn (Summary)..."
                value={articleForm.summary}
                onChange={(e) =>
                  setArticleForm({ ...articleForm, summary: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <textarea
                rows={6}
                placeholder="Nội dung chi tiết bài viết (hỗ trợ tiêu đề ## và đoạn văn)..."
                value={articleForm.content}
                onChange={(e) =>
                  setArticleForm({ ...articleForm, content: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold cursor-pointer"
              >
                {editingArticleId ? "Lưu Cập Nhật Bài Viết" : "Đăng Bài Viết"}
              </button>
            </form>

            <div className="space-y-3">
              {config.articles.map((art) => (
                <div
                  key={art.id}
                  className={`theme-surface border rounded-2xl p-4 flex items-center justify-between gap-3 ${
                    editingArticleId === art.id ? "ring-2 ring-orange-500" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{art.title}</div>
                    <div className="text-xs theme-text-muted">
                      {art.category} · {art.publishedAt}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditArticle(art)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold cursor-pointer inline-flex items-center gap-1 shadow"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Sửa</span>
                    </button>
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
              onSubmit={handleSaveVideo}
              className={`theme-surface border rounded-3xl p-6 space-y-4 ${
                editingVideoId ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-blue-400">
                  {editingVideoId
                    ? "✎ Đang Chỉnh Sửa Video"
                    : "+ Thêm Video Hướng Dẫn Mới"}
                </h2>
                {editingVideoId && (
                  <button
                    type="button"
                    onClick={resetVideoForm}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Hủy sửa
                  </button>
                )}
              </div>

              <input
                type="text"
                required
                placeholder="Tiêu đề Video..."
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, title: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Danh mục (VD: Vibe Coding)..."
                  value={videoForm.category}
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, category: e.target.value })
                  }
                  className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Thời lượng (VD: 25:10)..."
                  value={videoForm.duration}
                  onChange={(e) =>
                    setVideoForm({ ...videoForm, duration: e.target.value })
                  }
                  className="px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Link Video YouTube..."
                value={videoForm.youtubeUrl}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, youtubeUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <input
                type="text"
                placeholder="Link Ảnh Thumbnail..."
                value={videoForm.thumbnailUrl}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <textarea
                rows={2}
                placeholder="Mô tả ngắn về video..."
                value={videoForm.description}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, description: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-xs sm:text-sm"
              />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoForm.isFeatured}
                    onChange={(e) =>
                      setVideoForm({ ...videoForm, isFeatured: e.target.checked })
                    }
                  />
                  <span>Đặt làm Video Tiêu Điểm (Lớn nhất)</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoForm.isMemberOnly}
                    onChange={(e) =>
                      setVideoForm({
                        ...videoForm,
                        isMemberOnly: e.target.checked,
                      })
                    }
                  />
                  <span>Thuộc nhóm Video Hội Viên Pro</span>
                </label>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                {editingVideoId ? "Lưu Cập Nhật Video" : "Thêm Video"}
              </button>
            </form>

            <div className="space-y-3">
              {config.videos.map((vid) => (
                <div
                  key={vid.id}
                  className={`theme-surface border rounded-2xl p-4 flex items-center justify-between gap-3 ${
                    editingVideoId === vid.id ? "ring-2 ring-orange-500" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{vid.title}</div>
                    <div className="text-xs theme-text-muted">
                      {vid.category} · {vid.duration}{" "}
                      {vid.isMemberOnly ? "· [Hội Viên]" : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditVideo(vid)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold cursor-pointer inline-flex items-center gap-1 shadow"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Sửa</span>
                    </button>
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

      {/* TAB 7: SERVICES B2B, CUSTOM GPTS, COURSE LEVELS, COMPETENCIES & COMMUNITIES */}
      {activeTab === "services" && (
        <div className="space-y-10">
          {/* 7.1 B2B/B2C Services */}
          <div className="theme-surface border rounded-3xl p-6 space-y-6">
            <h2 className="text-xl font-extrabold text-orange-400">
              1. Quản Lý Các Gói Giải Pháp Doanh Nghiệp & Cá Nhân (B2B / B2C Services)
            </h2>

            <form
              onSubmit={handleSaveService}
              className={`p-4 rounded-2xl theme-elevated border space-y-3 ${
                editingServiceId ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300">
                  {editingServiceId
                    ? "✎ Đang chỉnh sửa gói dịch vụ"
                    : "+ Thêm gói dịch vụ mới"}
                </span>
                {editingServiceId && (
                  <button
                    type="button"
                    onClick={() => setEditingServiceId(null)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Hủy sửa
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Tên gói dịch vụ..."
                  value={serviceForm.title}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, title: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Huy hiệu (VD: B2B Popular)..."
                  value={serviceForm.badge}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, badge: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Chữ trên nút CTA..."
                  value={serviceForm.ctaLabel}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, ctaLabel: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Mô tả gói dịch vụ..."
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
              />
              <textarea
                rows={3}
                placeholder="Các hạng mục bàn giao (mỗi dòng 1 ý)..."
                value={serviceForm.deliverables}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    deliverables: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold cursor-pointer"
              >
                {editingServiceId ? "Lưu Cập Nhật Dịch Vụ" : "+ Thêm Gói Dịch Vụ"}
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 rounded-2xl theme-elevated border flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-sm">{srv.title}</div>
                    <p className="text-xs theme-text-muted mt-1 line-clamp-2">
                      {srv.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t theme-border">
                    <button
                      type="button"
                      onClick={() => startEditService(srv)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-extrabold cursor-pointer inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          ...config,
                          services: config.services.filter((s) => s.id !== srv.id),
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs font-bold cursor-pointer ml-auto"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7.2 Custom GPTs */}
          <div className="theme-surface border rounded-3xl p-6 space-y-6">
            <h2 className="text-xl font-extrabold text-blue-400">
              2. Quản Lý Bộ Custom GPTs & AI Agents Độc Quyền
            </h2>

            <form
              onSubmit={handleSaveGpt}
              className={`p-4 rounded-2xl theme-elevated border space-y-3 ${
                editingGptId ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Tên Bộ GPT / Agent..."
                  value={gptForm.name}
                  onChange={(e) =>
                    setGptForm({ ...gptForm, name: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Danh mục (VD: Vibe Coding)..."
                  value={gptForm.category}
                  onChange={(e) =>
                    setGptForm({ ...gptForm, category: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
                />
                <input
                  type="text"
                  placeholder="Link truy cập GPT..."
                  value={gptForm.accessUrl}
                  onChange={(e) =>
                    setGptForm({ ...gptForm, accessUrl: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Mô tả chức năng của GPT..."
                value={gptForm.description}
                onChange={(e) =>
                  setGptForm({ ...gptForm, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
              />
              <textarea
                rows={2}
                placeholder="Các khả năng chính (mỗi dòng 1 ý)..."
                value={gptForm.capabilities}
                onChange={(e) =>
                  setGptForm({ ...gptForm, capabilities: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl theme-surface border text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                {editingGptId ? "Lưu Cập Nhật GPT" : "+ Thêm Bộ GPT"}
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.customGpts.map((gpt) => (
                <div
                  key={gpt.id}
                  className="p-4 rounded-2xl theme-elevated border flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-sm">{gpt.name}</div>
                    <p className="text-xs theme-text-muted mt-0.5 line-clamp-1">
                      {gpt.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditGpt(gpt)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-extrabold cursor-pointer inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig({
                          ...config,
                          customGpts: config.customGpts.filter((g) => g.id !== gpt.id),
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs font-bold cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7.3 Course Levels (with lessons!) & About Competencies & Communities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="theme-surface border rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold text-orange-400">
                3. Chỉnh Sửa 4 Cấp Độ & 18 Bài Học Khóa Học AI (/khoa-hoc-ai)
              </h3>
              {editingCourseId && (
                <form
                  onSubmit={handleSaveCourse}
                  className="p-4 rounded-2xl theme-elevated border ring-2 ring-orange-500 space-y-3"
                >
                  <input
                    type="text"
                    value={courseForm.badge}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, badge: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl theme-surface border text-xs"
                  />
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl theme-surface border text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={courseForm.subtitle}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl theme-surface border text-xs"
                  />
                  <label className="block text-[11px] font-bold text-blue-300">
                    Danh sách bài học (Mỗi dòng: Bài 01 | Tên bài | Thời lượng | Link)
                  </label>
                  <textarea
                    rows={5}
                    value={courseForm.lessonsText}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        lessonsText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl theme-surface border text-xs font-mono"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Lưu Cấp Độ & Bài Học
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCourseId(null)}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                </form>
              )}
              <div className="space-y-2.5">
                {config.courseLevels.map((lvl) => (
                  <div
                    key={lvl.id}
                    className="p-3.5 rounded-2xl theme-elevated border flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-orange-400">
                        {lvl.badge} ({lvl.lessons.length} bài)
                      </span>
                      <div className="font-bold text-xs sm:text-sm">{lvl.title}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEditCourse(lvl)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-extrabold cursor-pointer shrink-0 inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Sửa
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Competencies on /about */}
              <div className="theme-surface border rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-blue-400">
                  4. Chỉnh Sửa Năng Lực Chuyên Môn Trang /about
                </h3>
                {editingCompId && (
                  <form
                    onSubmit={handleSaveComp}
                    className="p-4 rounded-2xl theme-elevated border ring-2 ring-orange-500 space-y-3"
                  >
                    <input
                      type="text"
                      value={compForm.title}
                      onChange={(e) =>
                        setCompForm({ ...compForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl theme-surface border text-xs font-bold"
                    />
                    <textarea
                      rows={4}
                      value={compForm.itemsText}
                      onChange={(e) =>
                        setCompForm({ ...compForm, itemsText: e.target.value })
                      }
                      placeholder="Mỗi dòng 1 năng lực..."
                      className="w-full px-3 py-2 rounded-xl theme-surface border text-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Lưu Năng Lực
                    </button>
                  </form>
                )}
                <div className="space-y-2.5">
                  {(config.competencies || []).map((comp) => (
                    <div
                      key={comp.id}
                      className="p-3.5 rounded-2xl theme-elevated border flex items-center justify-between gap-3"
                    >
                      <div className="font-bold text-xs sm:text-sm">{comp.title}</div>
                      <button
                        type="button"
                        onClick={() => startEditComp(comp)}
                        className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-extrabold cursor-pointer shrink-0 inline-flex items-center gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Sửa
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communities */}
              <div className="theme-surface border rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-emerald-400">
                  5. Chỉnh Sửa Nhóm Cộng Đồng AI (#community)
                </h3>
                {editingCommunityId && (
                  <form
                    onSubmit={handleSaveCommunity}
                    className="p-4 rounded-2xl theme-elevated border ring-2 ring-orange-500 space-y-3"
                  >
                    <input
                      type="text"
                      value={communityForm.name}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl theme-surface border text-xs font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={communityForm.membersCount}
                        onChange={(e) =>
                          setCommunityForm({
                            ...communityForm,
                            membersCount: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-xl theme-surface border text-xs"
                      />
                      <input
                        type="text"
                        value={communityForm.url}
                        onChange={(e) =>
                          setCommunityForm({
                            ...communityForm,
                            url: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-xl theme-surface border text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      value={communityForm.description}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl theme-surface border text-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Lưu Nhóm Cộng Đồng
                    </button>
                  </form>
                )}
                <div className="space-y-2.5">
                  {config.communities.map((com) => (
                    <div
                      key={com.id}
                      className="p-3.5 rounded-2xl theme-elevated border flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-emerald-400">
                          {com.membersCount}
                        </span>
                        <div className="font-bold text-xs sm:text-sm">{com.name}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEditCommunity(com)}
                        className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-extrabold cursor-pointer shrink-0 inline-flex items-center gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Sửa
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SECURITY / CHANGE ADMIN PASSWORD */}
      {activeTab === "security" && (
        <div className="max-w-xl mx-auto theme-surface border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">
                Đổi Mật Khẩu Trang Quản Trị (/admin)
              </h2>
              <p className="text-xs theme-text-muted">
                Tài khoản hiện tại:{" "}
                <strong className="text-orange-400">
                  {config.adminAuth?.username || "admin"}
                </strong>
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5">
                Tên đăng nhập (Username)
              </label>
              <input
                type="text"
                required
                value={newUsernameInput}
                onChange={(e) => setNewUsernameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">
                Mật khẩu hiện tại *
              </label>
              <input
                type="password"
                required
                value={currentPassInput}
                onChange={(e) => setCurrentPassInput(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại..."
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">
                Mật khẩu mới *
              </label>
              <input
                type="password"
                required
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)..."
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5">
                Xác nhận mật khẩu mới *
              </label>
              <input
                type="password"
                required
                value={confirmPassInput}
                onChange={(e) => setConfirmPassInput(e.target.value)}
                placeholder="Nhập lại mật khẩu mới..."
                className="w-full px-3.5 py-2.5 rounded-xl theme-elevated border text-sm"
              />
            </div>

            {passChangeStatus && (
              <div
                className={`p-3.5 rounded-xl text-xs font-bold ${
                  passChangeStatus.type === "success"
                    ? "bg-emerald-950/80 border border-emerald-500/60 text-emerald-300"
                    : "bg-red-950/80 border border-red-500/60 text-red-300"
                }`}
              >
                {passChangeStatus.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-lg transition cursor-pointer"
            >
              Lưu Mật Khẩu Mới
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function AdminBackendPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Đang tải Quản trị...</div>}>
      <AdminBackendInner />
    </Suspense>
  );
}
