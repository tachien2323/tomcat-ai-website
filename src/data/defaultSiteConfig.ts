import { SiteConfig } from "@/types/site";

export const defaultSiteConfig: SiteConfig = {
  adminAuth: {
    username: "admin",
    password: "H@giang1989",
  },
  features: {
    heroQuickPills: true,
    aboutSection: true,
    b2bServices: true,
    aiTools: true,
    skillsHub: true,
    repoVault: true,
    customGpts: true,
    latestVideos: true,
    freeCourse: true,
    memberVideos: true,
    articles: true,
    community: true,
    omnichannel: true,
    donation: true,
    contactSection: true,
    floatingPromo: true,
    floatingCoffee: true,
  },
  brand: {
    brandName: "TOM CAT AI",
    fullName: "TOM CAT AI",
    roleTitle: "AI Solutions Architect · AI Educator & Automation Builder",
    tagline: "Ứng dụng AI thực chiến trong Công việc, Doanh nghiệp & Cuộc sống",
    heroBadge: "150.000+ Người theo dõi · 50+ Doanh nghiệp & Dự án AI thực chiến",
    heroTitlePrefix: "Làm Chủ & Ứng Dụng AI Cùng",
    heroTitleHighlight: "TOM CAT AI",
    heroSubtitle:
      "Nơi lưu trữ, chia sẻ toàn diện các Bài viết chuyên sâu, Công cụ AI, Kho GitHub Repo, Bộ Skills tự động hóa và Video thực chiến giúp Cá nhân & Doanh nghiệp tăng gấp 5 lần hiệu suất.",
    motto:
      "“Không phải AI sẽ thay thế bạn — chính người biết làm chủ và ứng dụng AI hiệu quả vào quy trình thực tế mới là người dẫn đầu.”",
    bioParagraphs: [
      "Xin chào! Tôi là nhà sáng lập thương hiệu TOM CAT AI — chuyên gia nghiên cứu, thiết kế giải pháp AI Automation, Vibe Coding và đào tạo ứng dụng Trí tuệ Nhân tạo thực chiến cho các doanh nghiệp và cá nhân tại Việt Nam.",
      "Với phương châm biến những công nghệ AI phức tạp thành các quy trình, bộ công cụ (Skills, Agents, Prompts, Workflows) đơn giản, dễ áp dụng ngay lập tức, TOM CAT AI giúp bạn tiết kiệm hàng chục giờ làm việc mỗi tuần.",
      "Tại website này, bạn có thể tự do khám phá kho lưu trữ hơn 1.000+ GitHub Repo chọn lọc, hàng trăm AI Templates/Skills sẵn sàng sử dụng, lộ trình học AI miễn phí từ con số 0 và các giải pháp tư vấn chuyển đổi AI chuyên biệt cho doanh nghiệp.",
    ],
    avatarUrl: "/tomcat-logo.jpg",
    speakerImageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    stats: [
      { label: "AI Templates & Skills", value: "2.050+" },
      { label: "GitHub Repos Chọn Lọc", value: "1.000+" },
      { label: "Công Cụ AI Thực Chiến", value: "35+" },
      { label: "Bài Học & Playbook Free", value: "100%" },
    ],
    contact: {
      email: "contact@tomcatai.vn",
      phone: "0909 888 999",
      zaloUrl: "https://zalo.me/0909888999",
      address: "TP. Hồ Chí Minh & Hà Nội, Việt Nam",
      youtubeUrl: "https://youtube.com/@tomcatai",
      facebookUrl: "https://facebook.com/tomcatai",
      facebookGroupUrl: "https://facebook.com/groups/tomcatai",
      githubUrl: "https://github.com/tomcatai",
      linkedinUrl: "https://linkedin.com/in/tomcatai",
      tiktokUrl: "https://tiktok.com/@tomcatai",
      twitterUrl: "https://x.com/tomcatai",
    },
    donationInfo: {
      bankName: "Techcombank (Ngân hàng TMCP Kỹ Thương Việt Nam)",
      accountNumber: "1903 8888 9999 88",
      accountHolder: "TOM CAT AI",
      paypalUrl: "https://paypal.me/tomcatai",
      qrImageUrl:
        "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=TOM_CAT_AI_DONATE_COFFEE",
      note: "Nếu những bài viết, bộ Skills và kho Repo trên TOM CAT AI giúp ích cho công việc của bạn, hãy mời mình một ly cafe để tiếp thêm năng lượng ra mắt nhiều tài nguyên miễn phí hơn nhé!",
    },
    floatingPromoInfo: {
      badge: "HOT SKILLS",
      title: "Bộ SKILLS AI TỰ ĐỘNG HÓA",
      subtitle: "Tối ưu công việc & Edit video tự động →",
      link: "/skills",
    },
  },
  competencies: [
    {
      id: "comp-1",
      title: "Kiến Trúc AI Agent & MCP",
      items: [
        "Thiết kế hệ thống Đa tác tử (Multi-Agent) tự hành",
        "Kết nối Model Context Protocol (MCP) với Google Workspace, CRM, SQL",
        "Xây dựng RAG Chatbot nội bộ đọc hiểu hàng ngàn tài liệu doanh nghiệp",
      ],
    },
    {
      id: "comp-2",
      title: "Vibe Coding & Phát Triển Sản Phẩm Số",
      items: [
        "Xây dựng Website, Cổng thông tin & Web App bằng Next.js, TypeScript",
        "Làm chủ Claude Code, Google Antigravity, Cursor tối ưu tốc độ x10",
        "Triển khai CI/CD tự động hóa qua GitHub & Vercel Production",
      ],
    },
    {
      id: "comp-3",
      title: "Tự Động Hóa Quy Trình Doanh Nghiệp",
      items: [
        "Tích hợp n8n, Make, Webhook tự động hóa Marketing & Chăm sóc khách hàng",
        "Xây dựng hệ thống Content Machine nhân bản nội dung đa kênh",
        "Tự động hóa sản xuất Video AI, Nhân bản giọng nói & Avatar",
      ],
    },
    {
      id: "comp-4",
      title: "Đào Tạo & Chuyển Giao Tư Duy AI",
      items: [
        "Đào tạo AI In-house thực chiến cho các phòng ban doanh nghiệp",
        "Coaching 1-1 cho lãnh đạo, chuyên gia và chủ doanh nghiệp nhỏ",
        "Đóng gói thư viện Prompt, Skills & SOP chuẩn hóa dễ áp dụng",
      ],
    },
  ],
  services: [
    {
      id: "srv-1",
      title: "Đào Tạo AI In-House Cho Doanh Nghiệp",
      targetAudience: "Doanh nghiệp (B2B)",
      badge: "B2B Popular",
      description:
        "Chương trình huấn luyện thực chiến được thiết kế riêng cho từng phòng ban (Marketing, Sales, HR, Vận hành, Lập trình) giúp nhân sự làm chủ Claude, ChatGPT, AI Agent và công cụ tự động hóa.",
      deliverables: [
        "Khảo sát quy trình & thiết kế giáo trình riêng theo ngành nghề",
        "Thực hành trực tiếp trên bài toán thực tế của doanh nghiệp",
        "Bàn giao bộ Prompt & AI Skills chuẩn hóa cho từng vị trí",
        "Đồng hành hỗ trợ kỹ thuật 60 ngày sau khóa học",
      ],
      ctaLabel: "Nhận đề cương đào tạo",
      ctaLink: "#contact",
      enabled: true,
    },
    {
      id: "srv-2",
      title: "Tư Vấn & Xây Dựng Hệ Thống AI Automation / Agent",
      targetAudience: "Doanh nghiệp (B2B)",
      badge: "Tự động hóa 24/7",
      description:
        "Triển khai các luồng công việc tự động (n8n, Claude Code, MCP, RAG Chatbot nội bộ, chăm sóc khách hàng đa kênh và sản xuất nội dung tự động) giúp tiết kiệm 60–80% chi phí vận hành.",
      deliverables: [
        "Xây dựng AI Chatbot đọc hiểu toàn bộ tài liệu nội bộ (RAG)",
        "Hệ thống tự động hóa Marketing, Content & Chăm sóc khách hàng",
        "Tích hợp CRM, Google Sheets, Zalo, Telegram, Slack qua MCP",
        "Bàn giao mã nguồn, tài liệu vận hành & bảo mật dữ liệu",
      ],
      ctaLabel: "Đặt lịch tư vấn giải pháp",
      ctaLink: "#contact",
      enabled: true,
    },
    {
      id: "srv-3",
      title: "Coaching 1-1 & Vibe Coding Xây Sản Phẩm Số",
      targetAudience: "Cá nhân & Đội nhóm",
      badge: "Thực chiến 1-1",
      description:
        "Đồng hành 1-1 giúp chuyên gia, chủ doanh nghiệp nhỏ (Solopreneur) tự xây dựng Website, Web App, hệ thống kênh nội dung AI và đóng gói quy trình làm việc thông minh mà không cần biết code.",
      deliverables: [
        "Làm chủ Claude Code, Antigravity, Cursor để tạo Web/App hoàn chỉnh",
        "Xây dựng hệ thống Content Machine tự động hóa đa kênh",
        "Cài đặt bộ Skills Edit Video & Tạo hình ảnh/video AI chuyên nghiệp",
        "Hỗ trợ đưa sản phẩm lên GitHub & chạy chính thức trên Vercel",
      ],
      ctaLabel: "Đăng ký Coaching 1-1",
      ctaLink: "#contact",
      enabled: true,
    },
  ],
  aiTools: [
    {
      id: "tool-1",
      name: "Claude AI & Claude Code",
      category: "Lập trình & Trợ lý AI",
      description:
        "Mô hình AI hàng đầu cho viết nội dung sâu sắc, phân tích tài liệu dài và Vibe Coding xây dựng phần mềm tự động trên Terminal.",
      badge: "Khuyên dùng #1",
      url: "https://claude.ai",
      iconText: "CL",
      accentColor: "orange",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-2",
      name: "Google Antigravity & Gemini",
      category: "Lập trình & Trợ lý AI",
      description:
        "Môi trường Agentic IDE thế hệ mới giúp thiết kế, lập trình, kiểm thử và triển khai ứng dụng web với các AI Subagents tự hành.",
      badge: "Agentic IDE",
      url: "https://deepmind.google",
      iconText: "AG",
      accentColor: "navy",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-3",
      name: "Higgsfield AI",
      category: "Tạo Video & Điện ảnh AI",
      description:
        "Nền tảng tạo video điện ảnh với chuyển động camera chuyên nghiệp, đồng bộ nhân vật và hiệu ứng VFX đỉnh cao cho nhà sáng tạo.",
      badge: "Video Hot",
      url: "https://higgsfield.ai",
      iconText: "HF",
      accentColor: "orange",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-4",
      name: "HeyGen AI Avatar",
      category: "Tạo Video & Điện ảnh AI",
      description:
        "Tạo nhân vật ảo (Digital Twin) nói chuyện tự nhiên bằng 40+ ngôn ngữ, nhân bản giọng nói và sản xuất video marketing hàng loạt.",
      badge: "AI Avatar",
      url: "https://heygen.com",
      iconText: "HG",
      accentColor: "navy",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-5",
      name: "ElevenLabs Voice AI",
      category: "Giọng nói & Âm thanh",
      description:
        "Công cụ chuyển văn bản thành giọng nói (TTS) và nhân bản giọng nói cảm xúc chân thực nhất thế giới, hỗ trợ tiếng Việt cực mượt.",
      badge: "Voice #1",
      url: "https://elevenlabs.io",
      iconText: "11",
      accentColor: "orange",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-6",
      name: "Topview AI Video",
      category: "Marketing & E-Commerce",
      description:
        "Biến link sản phẩm hoặc hình ảnh thành video quảng cáo TikTok/Reels/Shorts chuyển đổi cao chỉ trong vài phút với AI biên tập.",
      badge: "Affiliate & Ads",
      url: "https://topview.ai",
      iconText: "TV",
      accentColor: "navy",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-7",
      name: "n8n Workflow Automation",
      category: "Tự động hóa (Automation)",
      description:
        "Nền tảng tự động hóa mã nguồn mở mạnh mẽ kết nối hàng trăm ứng dụng với AI Agent, LLM, Webhook và cơ sở dữ liệu doanh nghiệp.",
      badge: "Open Source",
      url: "https://n8n.io",
      iconText: "N8",
      accentColor: "orange",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-8",
      name: "Perplexity Pro Search",
      category: "Nghiên cứu & Tìm kiếm",
      description:
        "Công cụ tìm kiếm và Deep Research bằng AI có trích dẫn nguồn chính xác, thay thế hàng giờ đọc báo cáo thị trường.",
      badge: "Research",
      url: "https://perplexity.ai",
      iconText: "PX",
      accentColor: "navy",
      featured: true,
      enabled: true,
    },
    {
      id: "tool-9",
      name: "NotebookLM (Google)",
      category: "Nghiên cứu & Tìm kiếm",
      description:
        "Trợ lý nghiên cứu thông minh của Google cho phép nạp hàng chục PDF, Website, Video YouTube để hỏi đáp, tạo bản đồ tư duy & Podcast.",
      badge: "Miễn phí",
      url: "https://notebooklm.google.com",
      iconText: "NB",
      accentColor: "emerald",
      featured: false,
      enabled: true,
    },
    {
      id: "tool-10",
      name: "OpenRouter API Hub",
      category: "Lập trình & Trợ lý AI",
      description:
        "Cổng kết nối hợp nhất hơn 300+ mô hình AI (Claude, GPT, Gemini, DeepSeek, Llama) chỉ với một API Key duy nhất cho lập trình viên.",
      badge: "Developer",
      url: "https://openrouter.ai",
      iconText: "OR",
      accentColor: "navy",
      featured: false,
      enabled: true,
    },
    {
      id: "tool-11",
      name: "Midjourney & Flux Pro",
      category: "Thiết kế & Hình ảnh",
      description:
        "Bộ đôi tạo ảnh nghệ thuật, ảnh sản phẩm thương mại và thiết kế giao diện thương hiệu có độ chi tiết quang học cao nhất hiện nay.",
      badge: "Image AI",
      url: "https://midjourney.com",
      iconText: "MJ",
      accentColor: "orange",
      featured: false,
      enabled: true,
    },
    {
      id: "tool-12",
      name: "Suno AI Studio v4",
      category: "Giọng nói & Âm thanh",
      description:
        "Sáng tác bài hát, nhạc nền video, nhạc thương hiệu có lời hoặc không lời chuẩn phòng thu chỉ bằng mô tả văn bản.",
      badge: "Music AI",
      url: "https://suno.com",
      iconText: "SN",
      accentColor: "navy",
      featured: false,
      enabled: true,
    },
  ],
  skills: [
    {
      id: "sk-1",
      slug: "frontend-design-system-pro",
      name: "frontend-design-pro",
      titleVi: "Thiết kế Giao diện Web Chuyên Nghiệp (UI/UX Architect)",
      category: "Skills",
      tag: "Creative Design",
      downloadsCount: "53.890",
      description:
        "Bộ Skill hướng dẫn AI tự động thiết kế giao diện Website/Landing Page chuẩn hiện đại (Bento Grid, Dark/Light Mode, Typography phân cấp rõ ràng, không bị trùng lặp kiểu mẫu AI nhàm chán).",
      installCommand: "npx claude-code-templates@latest add skill frontend-design-pro",
      promptContent: `Bạn là Principal UI/UX Architect. Khi thiết kế hoặc viết code giao diện web:
1. Sử dụng hệ màu chủ đạo Blue Navy (#0A1628), Black (#050811) và điểm nhấn Orange (#F97316).
2. Áp dụng bố cục Bento Grid hiện đại, bo góc 16px-24px, đường viền tinh tế 1px.
3. Đảm bảo tương phản cao, hỗ trợ chuyển đổi Dark/Light Mode mượt mà theo chuẩn CSS color-scheme.
4. Tối ưu trải nghiệm trên cả Desktop & Mobile với hiệu ứng micro-interactions tinh tế.`,
      useCase: "Dùng khi tạo mới Landing Page, Website cá nhân, Dashboard quản trị hoặc nâng cấp giao diện ứng dụng.",
      level: "Thực chiến",
      isHot: true,
      priceLabel: "Miễn phí",
      enabled: true,
    },
    {
      id: "sk-2",
      slug: "ai-video-auto-editor-pack",
      name: "video-auto-editor",
      titleVi: "Bộ 8 Skills Edit Video Tự Động (Cắt khoảng lặng, Phụ đề, B-Roll)",
      category: "Skills",
      tag: "Video Automation",
      downloadsCount: "41.250",
      description:
        "Tự động hóa quy trình dựng video từ file quay thô: tự động cắt đoạn ngập ngừng, tạo phụ đề động chuẩn nhịp, chèn B-Roll minh họa, hiệu ứng âm thanh và xuất video 9:16 / 16:9.",
      installCommand: "npx tomcat-ai-skills@latest install video-auto-editor",
      promptContent: `Quy trình tự động biên tập video từ bản ghi (Transcript) & FFmpeg/Remotion:
1. Phân tích transcript bằng Whisper/Gemini để phát hiện và cắt bỏ khoảng lặng > 0.4s và câu nói vấp.
2. Đánh dấu các từ khóa quan trọng (Hook 3s đầu, số liệu, kết luận) để tạo hiệu ứng Text Highlight màu Cam (#F97316).
3. Tự động gợi ý và chèn B-Roll / Motion Graphics tại mỗi 8-12 giây để giữ chân người xem.
4. Cân bằng âm lượng chuẩn -14 LUFS và xuất file MP4 60fps.`,
      useCase: "Dành cho Content Creator, TikToker, YouTuber và đội ngũ Marketing doanh nghiệp muốn nhân bản 10-20 video/tuần.",
      level: "Chuyên sâu",
      isHot: true,
      priceLabel: "Bản Pro / Nổi bật",
      enabled: true,
    },
    {
      id: "sk-3",
      slug: "code-reviewer-security-guard",
      name: "code-reviewer",
      titleVi: "Chuyên Gia Kiểm Duyệt Code & Bảo Mật Ứng Dụng",
      category: "Agents",
      tag: "Development",
      downloadsCount: "34.807",
      description:
        "Subagent tự động kiểm tra chất lượng code trước khi đẩy lên GitHub/Vercel: phát hiện lỗi tiềm ẩn, lỗ hổng bảo mật, lộ API Key, tối ưu hiệu năng React/Next.js.",
      installCommand: "npx claude-code-templates@latest add agent code-reviewer",
      promptContent: `Khi được gọi để review code hoặc trước khi commit:
1. Kiểm tra tuyệt đối không có API Key, Secret hoặc thông tin nhạy cảm bị hardcode.
2. Đánh giá hiệu năng render, tránh waterfall fetch và memory leak.
3. Kiểm tra tính toàn vẹn TypeScript (không dùng kiểu dữ liệu lỏng lẻo gây crash runtime).
4. Xuất báo cáo ngắn gọn theo 3 mức: Critical, Warning, Suggestion kèm code sửa trực tiếp.`,
      useCase: "Chạy tự động trước mỗi lần git push hoặc deploy lên Vercel.",
      level: "Thực chiến",
      isHot: true,
      priceLabel: "Miễn phí",
      enabled: true,
    },
    {
      id: "sk-4",
      slug: "content-machine-b2b-creator",
      name: "content-machine-pro",
      titleVi: "Cỗ Máy Sản Xuất Nội Dung Đa Kênh Đúng Văn Phong Cá Nhân",
      category: "Workflows",
      tag: "Marketing & Content",
      downloadsCount: "29.410",
      description:
        "Biến 1 ý tưởng hoặc 1 video dài thành 10 định dạng nội dung khác nhau (Bài chuyên sâu Facebook, Thread X, Bài Blog chuẩn SEO, Kịch bản Reels 60s, Bản tin Email) giữ nguyên giọng văn riêng.",
      installCommand: "npx tomcat-ai-skills@latest add workflow content-machine-pro",
      promptContent: `Hãy đóng vai Giám đốc Nội dung của thương hiệu TOM CAT AI.
Đầu vào: [Chủ đề hoặc Bản ghi nội dung thô].
Hãy chuyển hóa thành 5 định dạng sau với giọng văn: Thực tế, Sắc bén, Giàu giá trị thực hành, Không sáo rỗng:
1. Bài viết Facebook chia sẻ kiến thức (có Hook mạnh 2 dòng đầu, chia mục rõ ràng, CTA thảo luận).
2. Bài viết chuyên sâu cho Website/Blog (Cấu trúc H2/H3, bảng so sánh, checklist hành động).
3. Kịch bản Video ngắn 60 giây (Hook 3s - Vấn đề - 3 Bước giải quyết - Kết luận).
4. Chuỗi 5 bài ngắn cho LinkedIn / Threads hướng tới khách hàng Doanh nghiệp.
5. Tóm tắt Key Takeaways dạng Infographic 5 ý chính.`,
      useCase: "Giúp chuyên gia và doanh nghiệp duy trì sự hiện diện đa kênh mỗi ngày chỉ với 30 phút biên tập.",
      level: "Cơ bản",
      isHot: true,
      priceLabel: "Miễn phí",
      enabled: true,
    },
    {
      id: "sk-5",
      slug: "mcp-google-workspace-connector",
      name: "mcp-workspace-hub",
      titleVi: "Cấu Hình MCP Kết Nối Google Sheets, Docs, Drive & Gmail",
      category: "MCPs",
      tag: "Integration",
      downloadsCount: "22.190",
      description:
        "Bộ cấu hình chuẩn giúp AI Agent đọc/ghi trực tiếp bảng tính Google Sheets, soạn tài liệu Google Docs và tổng hợp báo cáo công việc hàng ngày.",
      installCommand: "npx tomcat-ai-skills@latest add mcp workspace-hub",
      promptContent: `{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-workspace"],
      "env": {
        "GOOGLE_CLIENT_ID": "YOUR_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET": "YOUR_CLIENT_SECRET"
      }
    }
  }
}`,
      useCase: "Tích hợp vào Claude Desktop, Cursor hoặc Antigravity để AI thao tác trực tiếp trên dữ liệu doanh nghiệp.",
      level: "Thực chiến",
      isHot: false,
      priceLabel: "Miễn phí",
      enabled: true,
    },
    {
      id: "sk-6",
      slug: "b2b-proposal-generator-agent",
      name: "b2b-proposal-architect",
      titleVi: "Agent Lập Đề Án & Báo Giá Giải Pháp AI Cho Doanh Nghiệp",
      category: "Prompts",
      tag: "Business & B2B",
      downloadsCount: "18.640",
      description:
        "Tự động phân tích nỗi đau (Pain Points) của khách hàng doanh nghiệp, tính toán ROI dự kiến và xuất bản đề xuất giải pháp (Proposal) chuyên nghiệp.",
      installCommand: "npx tomcat-ai-skills@latest add prompt b2b-proposal-architect",
      promptContent: `Bạn là Chuyên gia Tư vấn Chuyển đổi Số & AI B2B cao cấp.
Dựa trên thông tin khách hàng: [Ngành nghề, Quy mô nhân sự, Quy trình đang tốn thời gian].
Hãy lập bản Đề xuất Giải pháp (Executive Proposal) gồm:
1. Chẩn đoán 3 điểm nghẽn hiện tại và chi phí cơ hội đang mất đi mỗi tháng.
2. Kiến trúc giải pháp AI đề xuất (Chia làm 3 giai đoạn: Quick Win 2 tuần -> Tự động hóa cốt lõi 4 tuần -> Chuyển giao & Đào tạo).
3. Bảng ước tính hiệu quả ROI (Số giờ tiết kiệm/tuần, mức tăng năng suất %).
4. Lộ trình triển khai & Cam kết bảo mật dữ liệu.`,
      useCase: "Sử dụng khi chuẩn bị tài liệu tư vấn, thuyết trình hoặc gửi báo giá cho đối tác B2B.",
      level: "Chuyên sâu",
      isHot: false,
      priceLabel: "Miễn phí",
      enabled: true,
    },
    {
      id: "sk-7",
      slug: "vercel-deploy-command-pro",
      name: "deploy-vercel-prod",
      titleVi: "Lệnh Tự Động Kiểm Tra Build & Đẩy Lên GitHub + Vercel",
      category: "Commands",
      tag: "DevOps & Deploy",
      downloadsCount: "16.320",
      description:
        "Slash command tự động chạy kiểm tra TypeScript, tối ưu bundle Next.js, tạo commit chuẩn Conventional Commits, đẩy lên GitHub và kích hoạt bản dựng Production trên Vercel.",
      installCommand: "npx tomcat-ai-skills@latest add command deploy-vercel-prod",
      promptContent: `Quy trình thực thi lệnh /deploy-vercel-prod:
1. Chạy 'npm run build' để đảm bảo 0 lỗi TypeScript và 0 lỗi靜 (Static Generation).
2. Kiểm tra file .gitignore đã loại trừ .env*.local và node_modules.
3. Thực hiện git add, tạo commit với thông điệp rõ ràng và git push origin main.
4. Triển khai lên Vercel Production và kiểm tra trạng thái HTTP 200 của tên miền chính thức.`,
      useCase: "Giúp người mới lẫn lập trình viên đưa website lên chạy chính thức không lo lỗi build.",
      level: "Cơ bản",
      isHot: false,
      priceLabel: "Miễn phí",
      enabled: true,
    },
    {
      id: "sk-8",
      slug: "nextjs-ai-portal-starter-template",
      name: "ai-portal-template",
      titleVi: "Template Website Cá Nhân & Cổng Tài Nguyên AI Chuẩn SEO",
      category: "Templates",
      tag: "Fullstack Template",
      downloadsCount: "27.950",
      description:
        "Bộ khung mã nguồn Next.js App Router + Tailwind CSS tích hợp sẵn trang quản trị Backend bật/tắt tính năng, kho Skills, kho Repo, Blog và giao diện Navy-Black-Orange.",
      installCommand: "git clone https://github.com/tomcatai/ai-portal-template.git",
      promptContent: `Cấu trúc Template chuẩn TOM CAT AI:
- src/app/page.tsx: Trang chủ tích hợp toàn bộ phân khu theo cấu hình Feature Flags.
- src/app/skills/page.tsx: Thư viện AI Templates & Skills có tìm kiếm và lọc danh mục.
- src/app/kho-repo/page.tsx: Danh bạ GitHub Repo chọn lọc.
- src/app/bai-viet/page.tsx: Hệ thống Blog/Playbook chuyên sâu.
- src/app/admin/page.tsx: Bảng điều khiển Backend bật/tắt mọi tính năng và chỉnh sửa dữ liệu trực tiếp.`,
      useCase: "Khởi tạo ngay website thương hiệu cá nhân hoặc cổng thông tin AI cho doanh nghiệp trong 15 phút.",
      level: "Thực chiến",
      isHot: true,
      priceLabel: "Mã nguồn mở",
      enabled: true,
    },
  ],
  repos: [
    {
      id: "repo-1",
      name: "claude-code",
      owner: "anthropics",
      topic: "Vibe Coding",
      stars: "82.4k",
      forks: "6.1k",
      language: "TypeScript",
      description:
        "Công cụ lập trình bằng AI Agent trực tiếp trên Terminal của Anthropic — hiểu toàn bộ codebase, tự sửa lỗi, chạy lệnh git và xây dựng tính năng phức tạp.",
      highlights: ["Terminal Agentic Coding", "Hỗ trợ MCP & Custom Slash Commands", "Tự động refactor & viết test"],
      url: "https://github.com/anthropics/claude-code",
      isFeatured: true,
      enabled: true,
    },
    {
      id: "repo-2",
      name: "browser-use",
      owner: "browser-use",
      topic: "AI Agents",
      stars: "64.8k",
      forks: "5.4k",
      language: "Python",
      description:
        "Giúp AI Agent có thể điều khiển trình duyệt web thực tế: tự động tìm kiếm thông tin, điền biểu mẫu, trích xuất dữ liệu và thực hiện tác vụ đa bước trên web.",
      highlights: ["Tương thích mọi LLM lớn", "Tự động nhận diện phần tử DOM", "Xây dựng Web Automation nhanh chóng"],
      url: "https://github.com/browser-use/browser-use",
      isFeatured: true,
      enabled: true,
    },
    {
      id: "repo-3",
      name: "n8n",
      owner: "n8n-io",
      topic: "Automation",
      stars: "78.2k",
      forks: "14.9k",
      language: "TypeScript",
      description:
        "Nền tảng tự động hóa luồng công việc (Workflow Automation) tích hợp sẵn AI Agent, LangChain và hơn 400+ kết nối ứng dụng, dễ dàng tự host trên VPS riêng.",
      highlights: ["Giao diện kéo thả trực quan", "Tích hợp AI Agent & Memory", "Tiết kiệm chi phí so với Zapier/Make"],
      url: "https://github.com/n8n-io/n8n",
      isFeatured: true,
      enabled: true,
    },
    {
      id: "repo-4",
      name: "ragflow",
      owner: "infiniflow",
      topic: "RAG & LLM",
      stars: "49.5k",
      forks: "4.8k",
      language: "Python",
      description:
        "Hệ thống RAG (Retrieval-Augmented Generation) mã nguồn mở chuyên sâu dựa trên khả năng hiểu bố cục tài liệu phức tạp (PDF, Bảng biểu, Hợp đồng, Báo cáo).",
      highlights: ["Trích xuất bảng biểu & PDF chuẩn xác", "Trích dẫn nguồn minh bạch", "Sẵn sàng cho dữ liệu doanh nghiệp"],
      url: "https://github.com/infiniflow/ragflow",
      isFeatured: true,
      enabled: true,
    },
    {
      id: "repo-5",
      name: "awesome-mcp-servers",
      owner: "punkpeye",
      topic: "MCP & Tools",
      stars: "45.1k",
      forks: "3.7k",
      language: "Markdown",
      description:
        "Danh sách tổng hợp đầy đủ nhất các máy chủ Model Context Protocol (MCP) giúp kết nối AI với Database, Google Workspace, GitHub, Slack, Notion, Browser...",
      highlights: ["Hàng trăm MCP Server phân loại rõ", "Hướng dẫn cài đặt nhanh", "Cập nhật liên tục hàng ngày"],
      url: "https://github.com/punkpeye/awesome-mcp-servers",
      isFeatured: true,
      enabled: true,
    },
    {
      id: "repo-6",
      name: "markitdown",
      owner: "microsoft",
      topic: "MCP & Tools",
      stars: "51.3k",
      forks: "2.9k",
      language: "Python",
      description:
        "Công cụ chính thức từ Microsoft giúp chuyển đổi mọi định dạng file văn phòng (PDF, Word, Excel, PowerPoint, Audio, HTML) sang Markdown sạch để nạp cho AI.",
      highlights: ["Chuẩn hóa dữ liệu đầu vào cho LLM", "Nhẹ, cực nhanh, hỗ trợ CLI & Python", "Tích hợp sẵn MCP server"],
      url: "https://github.com/microsoft/markitdown",
      isFeatured: true,
      enabled: true,
    },
    {
      id: "repo-7",
      name: "open-webui",
      owner: "open-webui",
      topic: "RAG & LLM",
      stars: "74.0k",
      forks: "8.6k",
      language: "Svelte / Python",
      description:
        "Giao diện AI tự quản trị (Self-hosted AI Interface) đẹp mắt, hỗ trợ chạy mô hình nội bộ qua Ollama hoặc kết nối OpenAI/OpenRouter cho toàn bộ nhân sự công ty.",
      highlights: ["Phân quyền người dùng doanh nghiệp", "Hỗ trợ RAG tài liệu & Web Search", "Bảo mật dữ liệu nội bộ"],
      url: "https://github.com/open-webui/open-webui",
      isFeatured: false,
      enabled: true,
    },
    {
      id: "repo-8",
      name: "crewAI",
      owner: "crewAIInc",
      topic: "AI Agents",
      stars: "38.7k",
      forks: "4.9k",
      language: "Python",
      description:
        "Framework điều phối hệ thống Đa tác tử (Multi-Agent System) đóng vai các phòng ban phối hợp giải quyết những bài toán nghiên cứu, viết lách và phân tích phức tạp.",
      highlights: ["Điều phối nhiều AI Agent theo vai trò", "Dễ cấu hình bằng YAML & Python", "Hiệu suất thực thi cao"],
      url: "https://github.com/crewAIInc/crewAI",
      isFeatured: false,
      enabled: true,
    },
    {
      id: "repo-9",
      name: "awesome-chatgpt-prompts",
      owner: "f",
      topic: "Prompt Engineering",
      stars: "124.5k",
      forks: "16.8k",
      language: "Markdown",
      description:
        "Kho tàng các câu lệnh Prompt đóng vai chuyên gia (Role-play Prompts) lớn nhất thế giới, giúp khai thác tối đa sức mạnh của ChatGPT, Claude và Gemini.",
      highlights: ["Hàng trăm mẫu Prompt đa lĩnh vực", "Cấu trúc System Prompt chuẩn mực", "Hoàn toàn miễn phí"],
      url: "https://github.com/f/awesome-chatgpt-prompts",
      isFeatured: false,
      enabled: true,
    },
  ],
  customGpts: [
    {
      id: "gpt-1",
      name: "TOM CAT — Kiến Trúc Sư Vibe Coding & Web App",
      category: "Vibe Coding",
      badge: "Độc quyền",
      description:
        "Trợ lý chuyên thiết kế cấu trúc dự án, viết file context.md, lập kế hoạch UI/UX và sinh bộ lệnh chuẩn cho Antigravity, Claude Code & Cursor.",
      capabilities: [
        "Chuyển ý tưởng kinh doanh thành bản đặc tả kỹ thuật chi tiết",
        "Tạo sẵn bảng màu, bố cục Bento Grid & cấu trúc Database",
        "Hướng dẫn từng bước đẩy code lên GitHub & Vercel",
      ],
      accessUrl: "https://chatgpt.com",
      demoVideoUrl: "https://youtube.com/@tomcatai",
      enabled: true,
    },
    {
      id: "gpt-2",
      name: "TOM CAT — Đạo Diễn Kịch Bản & Prompt Video Điện Ảnh",
      category: "Video & Sáng tạo",
      badge: "Creator Pro",
      description:
        "Tự động viết kịch bản phân cảnh (Storyboard), tạo câu lệnh góc máy điện ảnh cho Higgsfield, Kling, Sora, Veo 3 và đồng bộ nhân vật xuyên suốt.",
      capabilities: [
        "Tạo bảng phân cảnh chi tiết kèm mô tả ánh sáng & ống kính",
        "Giữ đồng nhất khuôn mặt và trang phục nhân vật qua mọi cảnh",
        "Tối ưu câu mở đầu (Hook 3s) giữ chân người xem trên TikTok/YouTube",
      ],
      accessUrl: "https://chatgpt.com",
      demoVideoUrl: "https://youtube.com/@tomcatai",
      enabled: true,
    },
    {
      id: "gpt-3",
      name: "TOM CAT — Chuyên Gia Tự Động Hóa & Quy Trình Doanh Nghiệp",
      category: "B2B & Automation",
      badge: "Doanh nghiệp",
      description:
        "Phân tích quy trình làm việc hiện tại của bạn hoặc phòng ban, từ đó đề xuất sơ đồ tự động hóa bằng n8n, Google Sheets, Zalo và AI Agent.",
      capabilities: [
        "Thiết kế sơ đồ luồng dữ liệu tự động hóa không cần biết code",
        "Tạo mẫu JSON workflow n8n & Apps Script dùng ngay",
        "Tính toán chi phí API tối ưu nhất cho doanh nghiệp",
      ],
      accessUrl: "https://chatgpt.com",
      demoVideoUrl: "https://youtube.com/@tomcatai",
      enabled: true,
    },
    {
      id: "gpt-4",
      name: "TOM CAT — Huấn Luyện Viên Nhân Bản Văn Phong Cá Nhân",
      category: "Content & Branding",
      badge: "Personal Brand",
      description:
        "Phân tích 5 bài viết mẫu của bạn để trích xuất 'DNA ngôn từ', giúp AI viết bài Facebook, Blog, Email giống hệt phong cách của bạn tới 95%.",
      capabilities: [
        "Giải mã nhịp điệu câu, từ vựng đặc trưng và cấu trúc lập luận",
        "Loại bỏ hoàn toàn giọng văn máy móc, sáo rỗng của AI thông thường",
        "Xuất file Skill/Instruction để tái sử dụng lâu dài trên Claude & ChatGPT",
      ],
      accessUrl: "https://chatgpt.com",
      demoVideoUrl: "https://youtube.com/@tomcatai",
      enabled: true,
    },
  ],
  videos: [
    {
      id: "vid-1",
      title: "Toàn Tập Vibe Coding 2026: Tự Thiết Kế & Đưa Website Cá Nhân Lên Vercel Trong 30 Phút",
      category: "Vibe Coding",
      duration: "32:15",
      views: "48.5K lượt xem",
      publishedAt: "Mới nhất",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Hướng dẫn thực chiến từ con số 0: cách viết file context.md, nghiên cứu website mẫu, tùy biến giao diện thương hiệu, tạo trang quản trị Backend và deploy tự động lên GitHub + Vercel.",
      isFeatured: true,
      isMemberOnly: false,
      level: "Cấp độ 1",
      enabled: true,
    },
    {
      id: "vid-2",
      title: "Cách Xây Dựng Hệ Thống AI Agent Tự Động Hóa 80% Công Việc Hàng Ngày",
      category: "AI Automation",
      duration: "26:40",
      views: "35.2K lượt xem",
      publishedAt: "3 ngày trước",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Kết hợp Claude, MCP và n8n để tự động đọc email, tổng hợp báo cáo Google Sheets, lên lịch nội dung và gửi thông báo cho đội nhóm.",
      isFeatured: false,
      isMemberOnly: false,
      level: "Cấp độ 2",
      enabled: true,
    },
    {
      id: "vid-3",
      title: "Bí Quyết Huấn Luyện AI Viết Bài Chuẩn Văn Phong Cá Nhân (Không Mùi Máy Móc)",
      category: "Content AI",
      duration: "19:50",
      views: "29.8K lượt xem",
      publishedAt: "1 tuần trước",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Phương pháp đóng gói Voice DNA thành bộ Skill riêng giúp bạn sản xuất bài viết chuyên sâu cho Facebook, LinkedIn và Website chỉ trong 10 phút.",
      isFeatured: false,
      isMemberOnly: false,
      level: "Cấp độ 3",
      enabled: true,
    },
    {
      id: "vid-4",
      title: "Quy Trình Làm Video AI & Edit Tự Động Bằng Bộ Skills Chuyên Nghiệp",
      category: "Video AI",
      duration: "24:12",
      views: "41.0K lượt xem",
      publishedAt: "2 tuần trước",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Bạn chỉ cần quay thô, AI sẽ tự động cắt khoảng lặng, chèn phụ đề, thêm hiệu ứng chuyển cảnh và B-Roll minh họa cực cuốn hút.",
      isFeatured: false,
      isMemberOnly: false,
      level: "Cấp độ 2",
      enabled: true,
    },
    {
      id: "vid-5",
      title: "Giải Pháp Triển Khai RAG Chatbot Nội Bộ Đọc Hiểu Hàng Ngàn Tài Liệu Doanh Nghiệp",
      category: "AI Doanh nghiệp",
      duration: "38:05",
      views: "22.4K lượt xem",
      publishedAt: "3 tuần trước",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Hướng dẫn kiến trúc RAG chuẩn doanh nghiệp: cách xử lý file PDF phức tạp, phân quyền truy cập và chống ảo giác (Hallucination) cho AI.",
      isFeatured: false,
      isMemberOnly: false,
      level: "Cấp độ 4",
      enabled: true,
    },
    {
      id: "vid-6",
      title: "[Chuyên Sâu] Kiến Trúc Multi-Agent Tự Vận Hành Phòng Marketing 24/7 Trên VPS",
      category: "Hội Viên Pro",
      duration: "45:30",
      views: "Hội viên",
      publishedAt: "Độc quyền",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Video hướng dẫn chi tiết cách cài đặt cụm AI Agent chạy 24/7 trên VPS tự động theo dõi xu hướng, lập kế hoạch, tạo nội dung và báo cáo qua Telegram.",
      isFeatured: false,
      isMemberOnly: true,
      level: "Chuyên sâu",
      enabled: true,
    },
    {
      id: "vid-7",
      title: "[Chuyên Sâu] Đóng Gói Dịch Vụ AI Automation B2B & Quy Trình Chốt Khách Hàng Doanh Nghiệp",
      category: "Hội Viên Pro",
      duration: "52:10",
      views: "Hội viên",
      publishedAt: "Độc quyền",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeEmbedId: "dQw4w9WgXcQ",
      description:
        "Chia sẻ thực tế bộ tài liệu khảo sát khách hàng, cách định giá dự án AI Automation, mẫu hợp đồng và quy trình bàn giao cho doanh nghiệp.",
      isFeatured: false,
      isMemberOnly: true,
      level: "Chuyên sâu",
      enabled: true,
    },
  ],
  courseLevels: [
    {
      id: "lvl-1",
      levelNumber: 1,
      badge: "Cấp Độ 1 · Nhập Môn",
      title: "Tư Duy Cốt Lõi & Làm Chủ Prompt Engineering",
      subtitle: "Nắm vững nguyên lý vận hành của LLM và cách giao việc cho AI chuẩn xác ngay từ lần đầu tiên.",
      lessonsCount: 5,
      duration: "1 giờ 45 phút",
      lessons: [
        {
          number: "Bài 01",
          title: "Bản đồ toàn cảnh các công cụ AI 2026: Chọn đúng công cụ cho đúng việc",
          duration: "18:20",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 02",
          title: "Công thức 5 thành phần (Context - Role - Task - Constraint - Output) cho mọi câu lệnh",
          duration: "24:10",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 03",
          title: "Kỹ thuật Few-Shot & Chain-of-Thought xử lý các bài toán phân tích phức tạp",
          duration: "21:45",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 04",
          title: "Cách kiểm soát ảo giác (Hallucination) và xác thực thông tin bằng Perplexity & NotebookLM",
          duration: "19:30",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 05",
          title: "Thực hành: Xây dựng thư viện 20 Prompt mẫu phục vụ công việc văn phòng hàng ngày",
          duration: "22:00",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
      ],
      enabled: true,
    },
    {
      id: "lvl-2",
      levelNumber: 2,
      badge: "Cấp Độ 2 · Thiết Lập Không Gian AI",
      title: "Thiết Lập AI Cowork & Quản Trị Tri Thức Cá Nhân",
      subtitle: "Biến Claude Projects, Custom GPTs và NotebookLM thành bộ não thứ hai hiểu rõ công việc của bạn.",
      lessonsCount: 4,
      duration: "1 giờ 35 phút",
      lessons: [
        {
          number: "Bài 06",
          title: "Thiết lập Claude Projects & Custom Instructions chuẩn hóa bối cảnh dự án",
          duration: "23:15",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 07",
          title: "Cách chuẩn bị và làm sạch tài liệu (Markdown/PDF) để AI đọc hiểu chính xác 100%",
          duration: "20:40",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 08",
          title: "Xây dựng Custom GPT chuyên biệt cho từng quy trình nội bộ và chia sẻ cho đội nhóm",
          duration: "26:10",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 09",
          title: "Ứng dụng Artifacts & Canvas để tạo biểu đồ, báo cáo tương tác và mẫu giao diện",
          duration: "25:00",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
      ],
      enabled: true,
    },
    {
      id: "lvl-3",
      levelNumber: 3,
      badge: "Cấp Độ 3 · Văn Phong & Sáng Tạo",
      title: "Huấn Luyện Văn Phong Cá Nhân & Sản Xuất Đa Phương Tiện",
      subtitle: "Tạo hệ thống sản xuất bài viết, hình ảnh và video tự động mang đậm dấu ấn thương hiệu riêng.",
      lessonsCount: 4,
      duration: "1 giờ 50 phút",
      lessons: [
        {
          number: "Bài 10",
          title: "Quy trình trích xuất Voice DNA: Dạy AI viết đúng giọng văn và trải nghiệm của bạn",
          duration: "28:30",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 11",
          title: "Xây dựng Content Machine: Từ 1 ý tưởng ra 10 nội dung đa kênh chất lượng cao",
          duration: "25:15",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 12",
          title: "Làm chủ tạo ảnh & video AI (Midjourney, Higgsfield, HeyGen, ElevenLabs)",
          duration: "29:45",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 13",
          title: "Tự động hóa hậu kỳ video bằng bộ Skills Edit Video thông minh",
          duration: "26:50",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
      ],
      enabled: true,
    },
    {
      id: "lvl-4",
      levelNumber: 4,
      badge: "Cấp Độ 4 · Vibe Coding & AI Agent",
      title: "Vibe Coding, Kết Nối MCP & Tự Động Hóa Doanh Nghiệp",
      subtitle: "Tự tay xây dựng Website, phần mềm nội bộ và kết nối AI với hệ thống dữ liệu thực tế.",
      lessonsCount: 5,
      duration: "2 giờ 20 phút",
      lessons: [
        {
          number: "Bài 14",
          title: "Nhập môn Vibe Coding: Cách giao tiếp với Antigravity & Claude Code để tạo Website hoàn chỉnh",
          duration: "31:00",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 15",
          title: "Kết nối MCP (Model Context Protocol): Cho phép AI thao tác trực tiếp trên Google Sheets & Database",
          duration: "27:20",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 16",
          title: "Thiết kế luồng tự động hóa n8n kết hợp AI Agent xử lý công việc 24/7",
          duration: "29:10",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 17",
          title: "Quản lý mã nguồn với GitHub và triển khai ứng dụng chuyên nghiệp lên Vercel",
          duration: "24:40",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
        {
          number: "Bài 18",
          title: "Tổng kết lộ trình: Xây dựng hệ sinh thái AI cho Cá nhân & Doanh nghiệp bền vững",
          duration: "28:00",
          videoUrl: "https://youtube.com/@tomcatai",
          isFree: true,
        },
      ],
      enabled: true,
    },
  ],
  articles: [
    {
      id: "art-1",
      slug: "lo-trinh-lam-chu-ai-agent-cho-ca-nhan-va-doanh-nghiep",
      title: "Lộ Trình Làm Chủ AI Agent Từ A–Z Cho Cá Nhân & Doanh Nghiệp (Bản Cập Nhật 2026)",
      category: "Chiến lược AI & Agent",
      summary:
        "Từ việc chỉ dùng AI để hỏi đáp đơn thuần sang xây dựng các hệ thống AI Agent có khả năng lập kế hoạch, sử dụng công cụ (MCP) và tự động hoàn thành quy trình công việc đầu-cuối.",
      publishedAt: "15/11/2026",
      readTime: "10 phút đọc",
      author: "TOM CAT AI",
      coverGradient: "from-blue-900 via-slate-900 to-orange-600",
      tags: ["AI Agent", "Doanh nghiệp", "MCP", "Automation"],
      isFeatured: true,
      enabled: true,
      content: `## 1. Sự dịch chuyển từ Chatbot sang AI Agent thực thi

Trong giai đoạn đầu của làn sóng AI tạo sinh, phần lớn cá nhân và doanh nghiệp chỉ dừng lại ở việc sử dụng ChatGPT hoặc Claude như một công cụ hỏi – đáp. Tuy nhiên, bước ngoặt thực sự về năng suất chỉ diễn ra khi bạn chuyển từ **Chat với AI** sang **Giao việc cho AI Agent**.

Một **AI Agent** hoàn chỉnh bao gồm 4 trụ cột:
- **Bộ não suy luận (Reasoning Engine)**: Các mô hình ngôn ngữ lớn như Claude Opus/Sonnet, Gemini Pro hoặc GPT-4o/o3.
- **Trí nhớ & Ngữ cảnh (Memory & Context)**: Tài liệu quy trình chuẩn (SOP), dữ liệu sản phẩm và lịch sử tương tác.
- **Bộ kỹ năng (Skills & Instructions)**: Các quy tắc đóng gói sẵn giúp AI biết chính xác tiêu chuẩn đầu ra.
- **Công cụ kết nối (Tools & MCP)**: Khả năng đọc/ghi Google Sheets, gửi Email, tra cứu web, chạy code và cập nhật CRM.

## 2. 4 Cấp độ ứng dụng AI trong Doanh nghiệp

1. **Cấp độ 1 — Trợ lý cá nhân (Copilot)**: Nhân sự dùng Prompt để tóm tắt văn bản, dịch thuật, viết nháp email. Tiết kiệm 15–20% thời gian.
2. **Cấp độ 2 — Chuẩn hóa bằng Skills & Templates**: Đóng gói các câu lệnh tốt nhất thành thư viện dùng chung cho toàn phòng ban. Tiết kiệm 35–40% thời gian.
3. **Cấp độ 3 — Tự động hóa quy trình (Workflow Automation)**: Kết hợp n8n / Make với AI để dữ liệu tự động chảy từ biểu mẫu khách hàng -> phân tích nhu cầu -> tạo báo giá -> gửi thông báo Zalo/Slack.
4. **Cấp độ 4 — Hệ thống Đa tác tử (Multi-Agent System)**: Nhiều AI Agent chuyên trách (Nghiên cứu, Viết nội dung, Kiểm duyệt, Báo cáo) phối hợp vận hành 24/7.

## 3. Bắt đầu từ đâu để không bị quá tải?

Đừng cố gắng tự động hóa tất cả cùng một lúc. Hãy áp dụng quy tắc **1 Quy trình – 1 Tuần**:
- Chọn 1 công việc lặp đi lặp lại tốn của bạn hoặc nhân sự hơn 5 giờ/tuần.
- Viết rõ từng bước thực hiện ra một file Markdown (\`context.md\` hoặc \`SKILL.md\`).
- Áp dụng một bộ Skill có sẵn trên **TOM CAT AI** để thử nghiệm và tinh chỉnh cho đến khi đạt 90% kỳ vọng.`,
    },
    {
      id: "art-2",
      slug: "xay-dung-co-may-san-xuat-noi-dung-content-machine-voi-ai",
      title: "Xây Dựng 'Content Machine' Với AI: Nhân Bản 1 Ý Tưởng Thành 15 Nội Dung Đa Kênh Đúng Giọng Văn",
      category: "Content & Marketing",
      summary:
        "Bí quyết giải quyết triệt để căn bệnh 'văn mẫu AI': cách trích xuất DNA ngôn từ cá nhân và thiết lập dây chuyền sản xuất bài viết, kịch bản video chuyên nghiệp.",
      publishedAt: "10/11/2026",
      readTime: "8 phút đọc",
      author: "TOM CAT AI",
      coverGradient: "from-orange-600 via-amber-700 to-blue-950",
      tags: ["Content Machine", "Voice DNA", "Claude", "Personal Brand"],
      isFeatured: true,
      enabled: true,
      content: `## Tại sao 90% bài viết bằng AI đều thất bại trong việc thu hút người đọc?

Lý do rất đơn giản: khi bạn đưa một câu lệnh ngắn ngủi như *"Hãy viết cho tôi bài đăng Facebook về ứng dụng AI"*, mô hình sẽ lấy trung bình cộng của hàng triệu bài viết trên Internet. Kết quả là một văn bản bóng bẩy nhưng vô hồn, thiếu góc nhìn thực tế và dễ dàng bị người đọc lướt qua trong 1 giây.

## Giải pháp: Công thức 3 Tầng của TOM CAT AI

### Tầng 1: Góc nhìn và Trải nghiệm thực (Human Insight)
AI không thể thay bạn trải nghiệm, nhưng AI là bậc thầy trong việc cấu trúc hóa suy nghĩ của bạn. Chỉ cần ghi âm 3 phút chia sẻ quan điểm thực tế của bạn về một chủ đề, bạn đã có nguyên liệu độc bản.

### Tầng 2: Bộ lọc Văn phong (Voice DNA Skill)
Cung cấp cho AI 5 bài viết tâm đắc nhất của bạn kèm bảng quy tắc:
- Cách xưng hô và nhịp điệu câu (ngắn gọn, đi thẳng vào vấn đề).
- Danh sách các từ khóa cấm dùng (những từ sáo rỗng kiểu dịch máy).
- Cấu trúc trình bày đặc trưng (Hook 2 dòng đầu -> Câu chuyện thực tế -> 3 bài học đắt giá -> Câu hỏi mở).

### Tầng 3: Chuyển đổi đa định dạng (Omnichannel Repurposing)
Từ một bài viết gốc chất lượng cao, sử dụng Workflow tự động để chuyển thành:
- 01 Bài phân tích chuyên sâu trên Website (chuẩn SEO).
- 01 Bài kể chuyện (Storytelling) trên Facebook cá nhân/Fanpage.
- 01 Kịch bản Video ngắn 60s cho TikTok / YouTube Shorts.
- 01 Bản tóm tắt dạng Checklist gửi cho cộng đồng.`,
    },
    {
      id: "art-3",
      slug: "vibe-coding-la-gi-cach-tu-tao-website-va-ung-dung-khong-can-biet-code",
      title: "Vibe Coding Thực Chiến: Cách Biến Ý Tưởng Thành Website Chuyên Nghiệp Trên GitHub & Vercel",
      category: "Vibe Coding",
      summary:
        "Hướng dẫn quy trình 5 bước giúp bất kỳ ai cũng có thể tự xây dựng Website cá nhân, Cổng thông tin doanh nghiệp hoặc công cụ nội bộ bằng ngôn ngữ tự nhiên.",
      publishedAt: "05/11/2026",
      readTime: "12 phút đọc",
      author: "TOM CAT AI",
      coverGradient: "from-slate-900 via-blue-900 to-indigo-950",
      tags: ["Vibe Coding", "Next.js", "Vercel", "GitHub"],
      isFeatured: true,
      enabled: true,
      content: `## Vibe Coding là gì?

**Vibe Coding** là phương pháp phát triển phần mềm mới, nơi bạn đóng vai trò là **Kiến trúc sư sản phẩm (Product Architect)** — người định hình mục tiêu, trải nghiệm người dùng, phong cách thiết kế và luồng tính năng, trong khi các AI Agent (như Google Antigravity, Claude Code, Cursor) đảm nhận việc viết code, kiểm thử và sửa lỗi.

## Quy trình 5 Bước Vibe Coding Chuẩn Chuyên Gia

1. **Khởi tạo File \`context.md\` rõ ràng**: Mô tả rõ mục tiêu của website, đối tượng khách hàng, trang web tham khảo và công nghệ triển khai.
2. **Nghiên cứu & Duyệt Kế hoạch (Plan First)**: Yêu cầu AI phân tích kỹ trang tham khảo và lập bản kế hoạch kiến trúc chi tiết trước khi viết dòng code đầu tiên.
3. **Thiết kế Tầng Quản trị (Backend / Config) linh hoạt**: Luôn yêu cầu tách biệt dữ liệu và tích hợp công tắc bật/tắt tính năng để dễ dàng tùy biến về sau mà không cần sửa code.
4. **Kiểm thử trực tiếp trên máy (Local Verification)**: Chạy thử nghiệm, kiểm tra giao diện sáng/tối, tốc độ phản hồi và khả năng hiển thị trên điện thoại.
5. **Đẩy lên GitHub & Kết nối Vercel**: Mỗi khi bạn cập nhật nội dung và đẩy lên GitHub, Vercel sẽ tự động cập nhật website chính thức chỉ sau 30 giây.`,
    },
    {
      id: "art-4",
      slug: "10-quy-trinh-ai-automation-giup-doanh-nghiep-tiet-kiem-40-gio-moi-tuan",
      title: "10 Quy Trình AI Automation Giúp Doanh Nghiệp Vừa & Nhỏ Tiết Kiệm 40 Giờ Làm Việc Mỗi Tuần",
      category: "AI Doanh nghiệp",
      summary:
        "Tổng hợp 10 bài toán tự động hóa có tỷ suất hoàn vốn (ROI) cao nhất cho doanh nghiệp: từ phân loại lead, chăm sóc khách hàng, đối soát hóa đơn đến đào tạo nhân sự mới.",
      publishedAt: "28/10/2026",
      readTime: "9 phút đọc",
      author: "TOM CAT AI",
      coverGradient: "from-blue-950 via-slate-900 to-orange-700",
      tags: ["B2B", "Automation", "n8n", "Hiệu suất"],
      isFeatured: false,
      enabled: true,
      content: `## Danh sách 10 quy trình tự động hóa hiệu quả nhất

1. **Tự động phân loại & chấm điểm khách hàng tiềm năng (Lead Scoring)**: Ngay khi khách để lại thông tin trên Website, AI tự động tra cứu thông tin doanh nghiệp, tóm tắt nhu cầu và phân bổ cho đúng chuyên viên kinh doanh qua Zalo/Telegram.
2. **Trợ lý AI tra cứu quy trình & chính sách nội bộ (Internal RAG Bot)**: Nhân viên mới hỏi quy trình nghỉ phép, biểu mẫu hợp đồng hay thông số sản phẩm sẽ nhận được câu trả lời tức thì kèm link file gốc.
3. **Tự động ghi biên bản cuộc họp & giao việc**: File ghi âm cuộc họp được chuyển thành văn bản, trích xuất danh sách công việc cần làm (Action Items), người phụ trách và hạn hoàn thành.
4. **Hệ thống báo cáo kinh doanh tự động mỗi sáng 8h00**: AI đọc dữ liệu từ Google Sheets / CRM, phân tích xu hướng tăng giảm và gửi bản tóm tắt ngắn gọn cho Ban giám đốc.`,
    },
  ],
  communities: [
    {
      id: "com-1",
      name: "Cộng Đồng TOM CAT AI — Ứng Dụng AI Thực Chiến",
      platform: "Facebook Group",
      membersCount: "85.000+ thành viên",
      description:
        "Nơi giao lưu, chia sẻ hàng ngày các mẹo sử dụng AI, bộ Prompt mới nhất, giải đáp thắc mắc và cập nhật xu hướng công cụ AI trong công việc & cuộc sống.",
      badge: "Sôi nổi mỗi ngày",
      url: "https://facebook.com/groups/tomcatai",
      enabled: true,
    },
    {
      id: "com-2",
      name: "Cộng Đồng Vibe Coding, Claude Code & AI Automation Việt Nam",
      platform: "Facebook Group & Discord",
      membersCount: "42.000+ thành viên",
      description:
        "Cộng đồng chuyên sâu dành cho những người yêu thích tự xây dựng Website, App, hệ thống AI Agent, MCP và luồng tự động hóa n8n cho doanh nghiệp.",
      badge: "Builder & Dev",
      url: "https://facebook.com/groups/tomcatai-builders",
      enabled: true,
    },
  ],
  socialChannels: [
    {
      id: "soc-1",
      platform: "YouTube Official",
      handle: "@tomcatai",
      followers: "150K+ Subscribers",
      description: "Video hướng dẫn thực chiến Vibe Coding, AI Agent & Công cụ AI hàng tuần.",
      url: "https://youtube.com/@tomcatai",
      enabled: true,
    },
    {
      id: "soc-2",
      platform: "Facebook Cá Nhân / Page",
      handle: "TOM CAT AI",
      followers: "95K+ Followers",
      description: "Cập nhật nhanh các bài viết chuyên sâu, case study và tài nguyên AI mới nhất.",
      url: "https://facebook.com/tomcatai",
      enabled: true,
    },
    {
      id: "soc-3",
      platform: "TikTok AI Channel",
      handle: "@tomcatai",
      followers: "120K+ Followers",
      description: "Video ngắn 60 giây tóm tắt công cụ AI hay, mẹo Prompt và tự động hóa công việc.",
      url: "https://tiktok.com/@tomcatai",
      enabled: true,
    },
    {
      id: "soc-4",
      platform: "GitHub Open Source",
      handle: "github.com/tomcatai",
      followers: "3.5K+ Stars",
      description: "Kho lưu trữ mã nguồn mở, bộ Skills, MCP config và template dự án AI.",
      url: "https://github.com/tomcatai",
      enabled: true,
    },
    {
      id: "soc-5",
      platform: "LinkedIn B2B Network",
      handle: "in/tomcatai",
      followers: "18K+ Connections",
      description: "Kết nối hợp tác doanh nghiệp, tư vấn chuyển đổi AI và đào tạo In-house.",
      url: "https://linkedin.com/in/tomcatai",
      enabled: true,
    },
    {
      id: "soc-6",
      platform: "X (Twitter) & Threads",
      handle: "@tomcatai",
      followers: "25K+ Followers",
      description: "Tin tức nóng hổi từ giới công nghệ AI toàn cầu và các luồng thảo luận ngắn.",
      url: "https://x.com/tomcatai",
      enabled: true,
    },
  ],
};
