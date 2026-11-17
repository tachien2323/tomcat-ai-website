import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWidgets } from "@/components/FloatingWidgets";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TOM CAT AI — Chuyên Gia AI, Kho Skills, GitHub Repo & Giải Pháp AI Thực Chiến",
  description:
    "Website chính thức của TOM CAT AI: Giới thiệu năng lực AI, chia sẻ Bài viết, Công cụ AI, Kho GitHub Repo, Bộ Skills tự động hóa, Video hướng dẫn và Giải pháp AI cho Doanh nghiệp & Cá nhân.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.querySelector('meta[name="color-scheme"]').content=localStorage.getItem("color-scheme")??"light dark";}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SiteConfigProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWidgets />
        </SiteConfigProvider>
      </body>
    </html>
  );
}
