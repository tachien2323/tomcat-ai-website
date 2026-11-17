"use client";

import React from "react";
import Link from "next/link";
import { Coffee, Sparkles, ArrowUpRight } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function FloatingWidgets() {
  const { config } = useSiteConfig();
  const { features, brand } = config;

  return (
    <>
      {/* Bottom-Left Sticky Promo Card (like phandonggiang.com) */}
      {features.floatingPromo && (
        <div className="fixed bottom-4 left-4 z-30 hidden sm:block max-w-xs">
          <Link
            href={brand.floatingPromoInfo.link || "/skills"}
            className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#070d1d]/95 backdrop-blur-md border border-orange-500/50 hover:border-orange-400 shadow-2xl shadow-orange-950/50 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400">
                  {brand.floatingPromoInfo.badge}
                </span>
              </div>
              <p className="text-xs font-extrabold text-white truncate mt-0.5 group-hover:text-orange-300 transition">
                {brand.floatingPromoInfo.title}
              </p>
              <p className="text-[11px] text-slate-300 truncate">
                {brand.floatingPromoInfo.subtitle}
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-orange-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </Link>
        </div>
      )}

      {/* Bottom-Right Sticky Coffee / Quick Contact Pill */}
      {features.floatingCoffee && (
        <div className="fixed bottom-4 right-4 z-30">
          <a
            href={features.donation ? "#donate" : "#contact"}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-600/30 border border-orange-300/30 transition"
          >
            <Coffee className="w-4 h-4" />
            <span>Ủng hộ 1 ly cafe</span>
          </a>
        </div>
      )}
    </>
  );
}
