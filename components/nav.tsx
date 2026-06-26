import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

/**
 * Top navigation bar — sticky, frosted glass background.
 * Shown on the home page and other non-docs pages.
 *
 * Links to the four product documentation sections.
 */
export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 card-warm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-1">
          <Link
            href="/docs/platform"
            className="px-3 py-1.5 text-sm text-sand-500 hover:text-sand-900 dark:hover:text-sand-50 transition-colors"
          >
            Platform
          </Link>
          <Link
            href="/docs/sdk"
            className="px-3 py-1.5 text-sm text-sand-500 hover:text-sand-900 dark:hover:text-sand-50 transition-colors"
          >
            SDK
          </Link>
          <Link
            href="/docs/runtime"
            className="px-3 py-1.5 text-sm text-sand-500 hover:text-sand-900 dark:hover:text-sand-50 transition-colors"
          >
            Runtime
          </Link>
          <Link
            href="/docs/agent"
            className="px-3 py-1.5 text-sm text-sand-500 hover:text-sand-900 dark:hover:text-sand-50 transition-colors"
          >
            Agent
          </Link>
          <Link
            href="/docs/platform"
            className="ml-2 inline-flex items-center gap-1 rounded-lg bg-ember-500 px-3 py-1.5 text-sm font-medium text-sand-950 hover:bg-ember-400 transition-colors shadow-glow-sm"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
