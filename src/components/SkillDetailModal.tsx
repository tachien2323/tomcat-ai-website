"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Copy,
  Check,
  Terminal,
  Sparkles,
  X,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Github } from "@/components/BrandIcons";

export interface SkillModalData {
  id: string;
  name: string;
  titleVi?: string;
  category: string;
  tag: string;
  level?: string;
  downloadsCount: string;
  description: string;
  installCommand: string;
  promptContent?: string;
  useCase?: string;
  githubUrl?: string;
  source?: string;
}

interface SkillDetailModalProps {
  skill: SkillModalData | null;
  onClose: () => void;
}

export function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (skill) {
      setCopiedCmd(false);
      setCopiedPrompt(false);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [skill]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    // Fallback for browsers without native closedby="any" support
    let cleanupLightDismiss: (() => void) | undefined;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const outside = (e: PointerEvent, dlg: HTMLDialogElement) => {
        const r = dlg.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = outside(e, dialog);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e, dialog)) {
          dialog.close();
        }
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupLightDismiss = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      if (cleanupLightDismiss) cleanupLightDismiss();
    };
  }, [onClose]);

  const copyCommand = async () => {
    if (!skill) return;
    await navigator.clipboard.writeText(skill.installCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copyPrompt = async () => {
    if (!skill?.promptContent) return;
    await navigator.clipboard.writeText(skill.promptContent);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="skill-modal-title"
      {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-3xl bg-[#081024] text-slate-100 border border-blue-800/80 shadow-2xl p-0 open:block"
    >
      {skill && (
        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {skill.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/60 text-blue-200 border border-blue-700/50">
                  {skill.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {skill.downloadsCount} lượt tải
                </span>
              </div>

              {skill.titleVi ? (
                <>
                  <h2
                    id="skill-modal-title"
                    className="text-xl sm:text-2xl font-extrabold text-white break-words"
                  >
                    {skill.titleVi}
                  </h2>
                  <p className="text-xs font-mono text-orange-300 break-all">
                    {skill.name}
                  </p>
                </>
              ) : (
                <h2
                  id="skill-modal-title"
                  className="text-xl sm:text-2xl font-mono font-extrabold text-white break-words"
                >
                  {skill.name}
                </h2>
              )}

              {skill.source && (
                <p className="text-xs font-mono text-slate-400">
                  Nguồn: {skill.source}
                </p>
              )}
            </div>

            <form method="dialog" className="shrink-0">
              <button
                type="submit"
                value="close"
                aria-label="Đóng cửa sổ"
                autoFocus
                className="w-9 h-9 rounded-xl bg-blue-950/80 hover:bg-orange-600 text-slate-300 hover:text-white flex items-center justify-center border border-blue-800/70 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {skill.description}
          </p>

          {/* Install CLI Command */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-orange-400" />
                Lệnh cài đặt nhanh (CLI / Terminal)
              </span>
              <button
                type="button"
                onClick={copyCommand}
                className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
              >
                {copiedCmd ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCmd ? "Đã sao chép!" : "Sao chép lệnh"}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-[#040814] border border-blue-900/80 text-xs font-mono text-orange-300 overflow-x-auto">
              <code>{skill.installCommand}</code>
            </pre>
          </div>

          {/* Prompt / Skill Content (when present) */}
          {skill.promptContent ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  Nội dung Cấu hình / System Prompt
                </span>
                <button
                  type="button"
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold transition cursor-pointer"
                >
                  {copiedPrompt ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedPrompt ? "Đã Copy Prompt!" : "Copy toàn bộ Prompt"}
                  </span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-[#040814] border border-blue-900/80 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {skill.promptContent}
              </pre>
            </div>
          ) : null}

          {/* GitHub & Usage footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {skill.githubUrl && (
              <a
                href={skill.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs sm:text-sm font-bold shadow-lg transition"
              >
                <Github className="w-4 h-4" />
                <span>Xem mã nguồn trên GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            <span className="text-xs text-slate-400">
              Tương thích Claude Code · Antigravity · ChatGPT Codex · Giấy phép MIT
            </span>
          </div>

          {skill.useCase && (
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 flex items-start gap-3">
              <Layers className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white">Ứng dụng thực tế: </span>
                {skill.useCase}
              </div>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
