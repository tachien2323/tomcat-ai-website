import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { defaultSiteConfig } from "@/data/defaultSiteConfig";
import { SiteConfig } from "@/types/site";

const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "site-config.json");
const TMP_CONFIG_PATH = path.join(os.tmpdir(), "tomcat-ai-site-config.json");

declare global {
  // eslint-disable-next-line no-var
  var __TOMCAT_MEM_CONFIG__: SiteConfig | undefined;
}

async function readJsonFile(filePath: string): Promise<SiteConfig | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as SiteConfig;
  } catch {
    return null;
  }
}

export async function GET() {
  const candidates: SiteConfig[] = [defaultSiteConfig];

  const diskConfig = await readJsonFile(CONFIG_FILE_PATH);
  if (diskConfig) candidates.push(diskConfig);

  const tmpConfig = await readJsonFile(TMP_CONFIG_PATH);
  if (tmpConfig) candidates.push(tmpConfig);

  if (globalThis.__TOMCAT_MEM_CONFIG__) {
    candidates.push(globalThis.__TOMCAT_MEM_CONFIG__);
  }

  // Pick the candidate with the highest updatedAt timestamp
  const best = candidates.reduce((prev, curr) => {
    const prevTime = prev.updatedAt || 0;
    const currTime = curr.updatedAt || 0;
    return currTime >= prevTime ? curr : prev;
  }, defaultSiteConfig);

  return NextResponse.json({
    config: {
      ...defaultSiteConfig,
      ...best,
      features: {
        ...defaultSiteConfig.features,
        ...(best.features || {}),
      },
      brand: {
        ...defaultSiteConfig.brand,
        ...(best.brand || {}),
        contact: {
          ...defaultSiteConfig.brand.contact,
          ...(best.brand?.contact || {}),
        },
        donationInfo: {
          ...defaultSiteConfig.brand.donationInfo,
          ...(best.brand?.donationInfo || {}),
        },
        floatingPromoInfo: {
          ...defaultSiteConfig.brand.floatingPromoInfo,
          ...(best.brand?.floatingPromoInfo || {}),
        },
      },
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SiteConfig;
    const payload: SiteConfig = {
      ...body,
      updatedAt: body.updatedAt || Date.now(),
    };

    // Always store in memory and /tmp for serverless warm instances
    globalThis.__TOMCAT_MEM_CONFIG__ = payload;
    try {
      await fs.writeFile(TMP_CONFIG_PATH, JSON.stringify(payload, null, 2), "utf-8");
    } catch {
      // ignore tmp write errors
    }

    try {
      await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(payload, null, 2), "utf-8");
      return NextResponse.json({
        ok: true,
        persistedToDisk: true,
        config: payload,
        message: "Đã lưu cấu hình và cập nhật dữ liệu thành công!",
      });
    } catch {
      return NextResponse.json({
        ok: true,
        persistedToDisk: false,
        config: payload,
        message: "Đã lưu và cập nhật dữ liệu thành công!",
      });
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Invalid payload" },
      { status: 400 }
    );
  }
}
