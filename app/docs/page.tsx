import Link from "next/link";
import {
  Boxes,
  Cpu,
  Database,
  Terminal,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DocCard } from "@/components/doc-card";

/**
 * The /docs index page — shows the four product sections as cards.
 * Each card links to the corresponding /docs/<section> route.
 */
const sections: Array<{
  icon: LucideIcon;
  href: string;
  title: string;
  description: string;
}> = [
  {
    icon: Boxes,
    href: "/docs/platform",
    title: "Platform",
    description:
      "The core Quark platform — three-service architecture, .quark.ts declaration format, node lifecycle, and the catalog service.",
  },
  {
    icon: Terminal,
    href: "/docs/sdk",
    title: "Quark JS SDK",
    description:
      "The @quarkloop/quark-js TypeScript client — execute nodes, build pipelines, browse the catalog, and monitor runtime health.",
  },
  {
    icon: Cpu,
    href: "/docs/runtime",
    title: "Quark Runtime",
    description:
      "The Rust runtime — loads and executes node implementations as .so or .wasm, bridged to clients over NATS.",
  },
  {
    icon: Database,
    href: "/docs/agent",
    title: "Quark Agent",
    description:
      "The autonomous AI workspace environment — supervisor, runtime, plugins, typed service functions, and tool execution.",
  },
];

export default function DocsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-sand-400">
          <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
          Documentation
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          Browse the docs
        </h1>
        <p className="mt-2 text-sand-400 max-w-2xl">
          Four products, one portal. Each section is synced from its own
          repository — pick a product to dive in.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <DocCard
            key={s.href}
            href={s.href}
            icon={s.icon}
            title={s.title}
            description={s.description}
          />
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border/60 bg-card/40 p-6">
        <h2 className="font-display text-lg font-semibold">
          How docs are organized
        </h2>
        <p className="mt-2 text-sm text-sand-400 leading-relaxed">
          Documentation markdown lives in each product&apos;s own GitHub
          repository. The{" "}
          <code className="rounded-md bg-ember-500/10 border border-ember-500/20 px-1.5 py-0.5 text-[0.85em] font-mono text-ember-300">
            sync-content.sh
          </code>{" "}
          script clones each repo and copies the markdown into this site&apos;s
          content directory at build time. The source of truth is always the
          product repo — this portal is a read-only aggregation.
        </p>
      </div>
    </main>
  );
}
