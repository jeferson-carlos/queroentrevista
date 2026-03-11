type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer: unknown[];
    // eslint-disable-next-line no-unused-vars
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
let isAnalyticsReady = false;

function isDebugEnabled(): boolean {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("ga_debug") === "1";
}

function ensureGtag(measurementIdValue: string) {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // Keep the same queue payload shape used in the official GA snippet.
      window.dataLayer.push(arguments);
    } as unknown as Window["gtag"];
  }

  const config: AnalyticsParams = {
    anonymize_ip: true
  };

  if (isDebugEnabled()) {
    config.debug_mode = true;
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementIdValue, config);
}

export function initAnalytics(): void {
  if (!measurementId || typeof window === "undefined" || isAnalyticsReady) {
    return;
  }

  const scriptId = "ga4-script";
  const existingScript = document.getElementById(scriptId);

  if (!existingScript) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  ensureGtag(measurementId);
  isAnalyticsReady = true;
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (!measurementId || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const eventParams: AnalyticsParams = { ...(params || {}) };
  if (isDebugEnabled()) {
    eventParams.debug_mode = true;
  }

  window.gtag("event", eventName, eventParams);
}
