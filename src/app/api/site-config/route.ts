import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { defaultSiteConfig } from "@/data/defaultSiteConfig";
import { SiteConfig } from "@/types/site";

const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "site-config.json");

export async function GET() {
  try {
    const raw = await fs.readFile(CONFIG_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as SiteConfig;
    return NextResponse.json({
      config: {
        ...defaultSiteConfig,
        ...parsed,
        features: {
          ...defaultSiteConfig.features,
          ...(parsed.features || {}),
        },
        brand: {
          ...defaultSiteConfig.brand,
          ...(parsed.brand || {}),
        },
      },
      source: "file",
    });
  } catch {
    return NextResponse.json({
      config: defaultSiteConfig,
      source: "default",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SiteConfig;
    try {
      await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(body, null, 2), "utf-8");
      return NextResponse.json({
        ok: true,
        persistedToDisk: true,
        message: "Đã lưu cấu hình vào src/data/site-config.json thành công.",
      });
    } catch {
      // On read-only serverless environments (like Vercel runtime), return ok so client localStorage & export still work seamlessly
      return NextResponse.json({
        ok: true,
        persistedToDisk: false,
        message:
          "Đã lưu trên trình duyệt (Môi trường Serverless chỉ đọc - bạn có thể Xuất file JSON để commit lên GitHub).",
      });
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Invalid payload" },
      { status: 400 }
    );
  }
}
