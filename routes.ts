// routes.ts
// Route configuration for the app

// Public routes (no auth required)
export const publicRoutes: string[] = [];

// Protected routes (require authentication)
export const protectedRoutes: string[] = [
  "/", // home is protected in this example
];

// Authentication routes (pages for sign-in / sign-up)
// Note: leading slash is recommended
export const authRoutes: string[] = [
  "/auth/sign-in",
];

// API auth prefix (NextAuth or similar)
export const apiAuthPrefix: string = "/api/auth";

// Default login redirect after successful auth
export const DEFAULT_LOGIN_REDIRECT: string = "/";
