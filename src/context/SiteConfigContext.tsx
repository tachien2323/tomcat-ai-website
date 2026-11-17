"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SiteConfig, FeatureFlags } from "@/types/site";
import { defaultSiteConfig } from "@/data/defaultSiteConfig";

const STORAGE_KEY = "tomcat_ai_site_config_v1";

interface SiteConfigContextValue {
  config: SiteConfig;
  isLoaded: boolean;
  isSaving: boolean;
  lastSavedMessage: string | null;
  updateConfig: (next: SiteConfig) => Promise<void>;
  toggleFeature: (key: keyof FeatureFlags) => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextValue | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedMessage, setLastSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadInitial() {
      try {
        const res = await fetch("/api/site-config", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mounted && data?.config) {
            // Check if localStorage has newer user overrides
            const localRaw = localStorage.getItem(STORAGE_KEY);
            if (localRaw && data.source === "default") {
              try {
                const localParsed = JSON.parse(localRaw) as SiteConfig;
                setConfig({
                  ...defaultSiteConfig,
                  ...localParsed,
                  features: {
                    ...defaultSiteConfig.features,
                    ...(localParsed.features || {}),
                  },
                });
              } catch {
                setConfig(data.config);
              }
            } else {
              setConfig(data.config);
            }
          }
        }
      } catch {
        try {
          const localRaw = localStorage.getItem(STORAGE_KEY);
          if (localRaw && mounted) {
            setConfig(JSON.parse(localRaw));
          }
        } catch {
          // ignore
        }
      } finally {
        if (mounted) setIsLoaded(true);
      }
    }
    loadInitial();
    return () => {
      mounted = false;
    };
  }, []);

  const updateConfig = useCallback(async (next: SiteConfig) => {
    setConfig(next);
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage quota errors
    }

    try {
      const res = await fetch("/api/site-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await res.json();
      setLastSavedMessage(data?.message || "Đã lưu cấu hình thành công!");
    } catch {
      setLastSavedMessage("Đã lưu cấu hình trên trình duyệt!");
    } finally {
      setIsSaving(false);
      setTimeout(() => setLastSavedMessage(null), 4000);
    }
  }, []);

  const toggleFeature = useCallback(
    async (key: keyof FeatureFlags) => {
      const next: SiteConfig = {
        ...config,
        features: {
          ...config.features,
          [key]: !config.features[key],
        },
      };
      await updateConfig(next);
    },
    [config, updateConfig]
  );

  const resetToDefault = useCallback(async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    await updateConfig(defaultSiteConfig);
  }, [updateConfig]);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isLoaded,
        isSaving,
        lastSavedMessage,
        updateConfig,
        toggleFeature,
        resetToDefault,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return ctx;
}
