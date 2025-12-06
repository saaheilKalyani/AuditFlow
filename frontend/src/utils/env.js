// Vite provides import.meta.env only in browser builds
export const ENV = {
  API_BASE:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE
      ? import.meta.env.VITE_API_BASE
      : ""
};
