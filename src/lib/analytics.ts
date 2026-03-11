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

function ensureGtag(measurementIdValue: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer.push(args);
    });

  window.gtag("js", new Date());
  window.gtag("config", measurementIdValue, {
    anonymize_ip: true
  });
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

  window.gtag("event", eventName, params || {});
}
