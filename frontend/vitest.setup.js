import "@testing-library/jest-dom";

// Polyfills
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Vite env
vi.mock("/src/utils/env.js", () => ({
  ENV: { API_BASE: "" }
}));
