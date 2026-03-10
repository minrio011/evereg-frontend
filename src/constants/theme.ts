export const COLORS = {
  primary: "#e8003a", // Maybelline Red
  primaryHover: "#d00034",
  secondary: "#1a1a1a", // Text Black
  background: "#f5f5f7", // Page BG
  border: "#f0f0f0",
  success: "#22c55e",
  text: {
    main: "#333333",
    muted: "#666666",
    light: "#888888",
    white: "#ffffff",
  }
} as const;

export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  toast: "0 4px 20px rgba(0,0,0,0.2)",
} as const;
