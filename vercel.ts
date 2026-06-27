/**
 * vercel.ts — Programmatic Vercel configuration for the Quark docs site.
 *
 * Replaces the traditional vercel.json with a type-safe TypeScript config
 * that executes at build time. This file is consumed by the Vercel CLI
 * when you run `vercel` or `vercel --prod` from the project root.
 *
 * ## What this config does
 *
 * 1. Sets the framework to Next.js
 * 2. Runs the content sync script (pulls markdown from all 4 product repos)
 *    as a pre-build step, then builds the Next.js app, then generates the
 *    Pagefind search index as a post-build step.
 * 3. Enables clean URLs (no .html extensions)
 * 4. Strips trailing slashes (e.g. /docs/ → /docs)
 * 5. Sets long-lived cache headers for static assets (JS, CSS, fonts, images)
 * 6. Sets security headers (X-Content-Type-Options, X-Frame-Options, etc.)
 *
 * ## Deploying
 *
 * Install the Vercel CLI:
 *   npm i -g vercel
 *
 * From this repo's root:
 *   vercel          # preview deployment
 *   vercel --prod   # production deployment
 *
 * The CLI reads this vercel.ts file automatically. No GitHub Actions or
 * CI/CD integration is needed — deployment is manual.
 *
 * ## Prerequisites
 *
 * The sync script clones product repos via HTTPS — all three repos are public, so no authentication is needed on Vercel or in CI.
 * @see https://vercel.com/docs/project-configuration/vercel-ts
 */

import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  // Framework — Next.js (App Router)
  framework: "nextjs",

  // Build pipeline:
  //   1. sync-content.sh  — clone product repos, copy markdown into content/
  //   2. next build       — compile the Next.js app
  //   3. postbuild (npm)  — run pagefind to generate the search index
  //
  // The "npm run build" command triggers both "build" and "postbuild"
  // scripts defined in package.json.
  buildCommand: "./scripts/sync-content.sh && npm run build",

  // Dev command for `vercel dev` (local testing with Vercel's infra)
  devCommand: "./scripts/sync-content.sh && next dev",

  // Output directory — Next.js standard
  outputDirectory: ".next",

  // Clean URLs: /docs/page instead of /docs/page.html
  cleanUrls: true,

  // No trailing slashes: /docs → /docs (not /docs/)
  // Prevents duplicate-content SEO issues.
  trailingSlash: false,

  // Headers — security + caching
  headers: [
    // Security headers applied to all routes
    routes.header("/(.*)", [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ]),

    // Long-lived cache for static assets (1 year)
    // Matches JS, CSS, fonts, images, and other static file types.
    routes.cacheControl(
      "/(.*)\\.(js|css|jpg|jpeg|gif|png|svg|webp|ico|txt|ttf|woff2|webmanifest)",
      {
        public: true,
        maxAge: "1 year",
        immutable: true,
      },
    ),

    // Pagefind search index — cache for 1 hour (regenerated on each deploy)
    routes.cacheControl("/pagefind/(.*)", {
      public: true,
      maxAge: "1 hour",
    }),
  ],
};
