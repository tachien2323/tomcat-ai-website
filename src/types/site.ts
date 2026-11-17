export interface FeatureFlags {
  heroQuickPills: boolean;
  aboutSection: boolean;
  b2bServices: boolean;
  aiTools: boolean;
  skillsHub: boolean;
  repoVault: boolean;
  customGpts: boolean;
  latestVideos: boolean;
  freeCourse: boolean;
  memberVideos: boolean;
  articles: boolean;
  community: boolean;
  omnichannel: boolean;
  donation: boolean;
  contactSection: boolean;
  floatingPromo: boolean;
  floatingCoffee: boolean;
}

export interface BrandProfile {
  brandName: string;
  fullName: string;
  roleTitle: string;
  tagline: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  motto: string;
  bioParagraphs: string[];
  avatarUrl: string;
  speakerImageUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
  contact: {
    email: string;
    phone: string;
    zaloUrl: string;
    address: string;
    youtubeUrl: string;
    facebookUrl: string;
    facebookGroupUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    tiktokUrl: string;
    twitterUrl: string;
  };
  donationInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    paypalUrl: string;
    qrImageUrl: string;
    note: string;
  };
  floatingPromoInfo: {
    badge: string;
    title: string;
    subtitle: string;
    link: string;
  };
}

export interface AiToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
  url: string;
  iconText: string;
  accentColor: "orange" | "navy" | "emerald" | "purple";
  featured?: boolean;
  enabled: boolean;
}

export interface SkillTemplateItem {
  id: string;
  slug: string;
  name: string;
  titleVi: string;
  category:
    | "Skills"
    | "Agents"
    | "Prompts"
    | "Commands"
    | "MCPs"
    | "Workflows"
    | "Templates";
  tag: string;
  downloadsCount: string;
  description: string;
  installCommand: string;
  promptContent: string;
  useCase: string;
  level: "Cơ bản" | "Thực chiến" | "Chuyên sâu";
  isHot?: boolean;
  priceLabel?: string;
  enabled: boolean;
}

export interface RepoItem {
  id: string;
  name: string;
  owner: string;
  topic:
    | "AI Agents"
    | "Vibe Coding"
    | "Automation"
    | "RAG & LLM"
    | "Video & Audio AI"
    | "MCP & Tools"
    | "Prompt Engineering";
  stars: string;
  forks: string;
  language: string;
  description: string;
  highlights: string[];
  url: string;
  isFeatured?: boolean;
  enabled: boolean;
}

export interface CustomGptItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  capabilities: string[];
  accessUrl: string;
  demoVideoUrl: string;
  enabled: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  publishedAt: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  youtubeEmbedId: string;
  description: string;
  isFeatured?: boolean;
  isMemberOnly?: boolean;
  level?: string;
  enabled: boolean;
}

export interface CourseLevelItem {
  id: string;
  levelNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  lessonsCount: number;
  duration: string;
  lessons: {
    number: string;
    title: string;
    duration: string;
    videoUrl: string;
    isFree: boolean;
  }[];
  enabled: boolean;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  publishedAt: string;
  readTime: string;
  author: string;
  coverGradient: string;
  tags: string[];
  content: string;
  isFeatured?: boolean;
  enabled: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  targetAudience: "Doanh nghiệp (B2B)" | "Cá nhân & Đội nhóm" | "Chuyên sâu 1-1";
  badge: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
  ctaLink: string;
  enabled: boolean;
}

export interface CommunityItem {
  id: string;
  name: string;
  platform: string;
  membersCount: string;
  description: string;
  badge: string;
  url: string;
  enabled: boolean;
}

export interface SocialChannelItem {
  id: string;
  platform: string;
  handle: string;
  followers: string;
  description: string;
  url: string;
  enabled: boolean;
}

export interface CompetencyItem {
  id: string;
  title: string;
  items: string[];
}

export interface AdminAuthConfig {
  username: string;
  password: string;
}

export interface SiteConfig {
  updatedAt?: number;
  adminAuth?: AdminAuthConfig;
  features: FeatureFlags;
  brand: BrandProfile;
  competencies?: CompetencyItem[];
  services: ServiceItem[];
  aiTools: AiToolItem[];
  skills: SkillTemplateItem[];
  repos: RepoItem[];
  customGpts: CustomGptItem[];
  videos: VideoItem[];
  courseLevels: CourseLevelItem[];
  articles: ArticleItem[];
  communities: CommunityItem[];
  socialChannels: SocialChannelItem[];
}
