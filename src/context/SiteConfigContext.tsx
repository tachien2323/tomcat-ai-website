"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SiteConfig, FeatureFlags } from "@/types/site";
import { defaultSiteConfig } from "@/data/defaultSiteConfig";

const STORAGE_KEY = "tomcat_ai_site_config_v2";

function mergeSiteConfig(base: SiteConfig, override: Partial<SiteConfig>): SiteConfig {
  return {
    ...base,
    ...override,
    features: {
      ...base.features,
      ...(override.features || {}),
    },
    brand: {
      ...base.brand,
      ...(override.brand || {}),
      contact: {
        ...base.brand.contact,
        ...(override.brand?.contact || {}),
      },
      donationInfo: {
        ...base.brand.donationInfo,
        ...(override.brand?.donationInfo || {}),
      },
      floatingPromoInfo: {
        ...base.brand.floatingPromoInfo,
        ...(override.brand?.floatingPromoInfo || {}),
      },
    },
  };
}

interface SiteConfigContextValue {
  config: SiteConfig;
  isLoaded: boolean;
  isSaving: boolean;
  lastSavedMessage: string | null;
  quickEditMode: boolean;
  setQuickEditMode: (val: boolean) => void;
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
  const [quickEditMode, setQuickEditMode] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    // 1. Immediately hydrate from localStorage if available
    let localConfig: SiteConfig | null = null;
    try {
      const localRaw = localStorage.getItem(STORAGE_KEY);
      if (localRaw) {
        localConfig = mergeSiteConfig(defaultSiteConfig, JSON.parse(localRaw));
        if (mounted) {
          setConfig(localConfig);
        }
      }
    } catch {
      // ignore invalid localStorage JSON
    }

    // 2. Fetch server config and pick whichever has the newer updatedAt timestamp
    async function loadInitial() {
      try {
        const res = await fetch("/api/site-config", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mounted && data?.config) {
            const serverConfig = mergeSiteConfig(defaultSiteConfig, data.config);
            const localTime = localConfig?.updatedAt || 0;
            const serverTime = serverConfig.updatedAt || 0;

            if (localConfig && localTime >= serverTime && localTime > 0) {
              setConfig(localConfig);
            } else {
              setConfig(serverConfig);
              if (serverTime > localTime) {
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(serverConfig));
                } catch {
                  // ignore
                }
              }
            }
          }
        }
      } catch {
        // Keep localConfig or defaultSiteConfig
      } finally {
        if (mounted) setIsLoaded(true);
      }
    }

    loadInitial();
    return () => {
      mounted = false;
    };
  }, []);

  const updateConfig = useCallback(async (nextInput: SiteConfig) => {
    const next: SiteConfig = {
      ...nextInput,
      updatedAt: Date.now(),
    };
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
      setLastSavedMessage("Đã lưu cấu hình thành công!");
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
    const resetCfg: SiteConfig = {
      ...defaultSiteConfig,
      updatedAt: Date.now(),
    };
    await updateConfig(resetCfg);
  }, [updateConfig]);

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isLoaded,
        isSaving,
        lastSavedMessage,
        quickEditMode,
        setQuickEditMode,
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
