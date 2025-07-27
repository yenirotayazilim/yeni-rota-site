export {};

declare global {
  interface Window {
    respondIO?: {
      open: () => void;
      close: () => void;
    };
  }
}
