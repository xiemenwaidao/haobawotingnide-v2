/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Google Analytics の型定義
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLayer: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag: (...args: any[]) => void;
}
