import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Cpu,
  Database,
  Terminal,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/**
 * The four product sections of the unified docs portal.
 * Each links to the corresponding /docs/<section> route.
 */
const products: Array<{
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  href: string;
}> = [
  {
    icon: Boxes,
    name: "Platform",
    tagline: "Java + Go · Three-service architecture",
    description:
      "The core Quark platform — control plane, data plane, catalog service, node lifecycle, and the .quark.ts declaration format.",
    href: "/docs/platform",
  },
  {
    icon: Terminal,
    name: "JS SDK",
    tagline: "TypeScript · npm package",
    description:
      "The @quarkloop/quark-js client library — execute nodes, build pipelines, browse the catalog, and monitor runtime health from TypeScript.",
    href: "/docs/sdk",
  },
  {
    icon: Cpu,
    name: "Runtime",
    tagline: "Rust · NATS bridge",
    description:
      "The Rust runtime that loads and executes node implementations as shared libraries (.so) or WebAssembly (.wasm) over NATS.",
    href: "/docs/runtime",
  },
  {
    icon: Database,
    name: "Agent",
    tagline: "Go + Rust · Autonomous workspaces",
    description:
      "The local operating environment for autonomous AI workspaces — supervisor, runtime, plugins, typed service functions, and tool execution.",
    href: "/docs/agent",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-sand-400 backdrop-blur-sm animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
            </span>
            Unified Documentation
          </div>

          <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-balance animate-slide-up">
            Quark
            <br />
            <span className="text-ember-500">documentation</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-sand-400 leading-relaxed text-pretty animate-slide-up [animation-delay:60ms]">
            One portal for everything Quark — the platform architecture,
            the JavaScript SDK, the Rust runtime, and the autonomous agent
            environment.
          </p>
        </div>
      </section>

      {/* Product sections */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Browse by product
          </h2>
          <p className="mt-1 text-sm text-sand-400">
            Each section is synced from its own repository — the source of
            truth lives with the code.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p, i) => (
            <Link
              key={p.name}
              href={p.href}
              className="group relative rounded-2xl card-warm p-6 transition-all hover:border-ember-500/40 hover:shadow-glow-sm animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 group-hover:bg-ember-500/20 transition-colors">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-semibold">
                      {p.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider font-medium text-sand-500 whitespace-nowrap">
                      {p.tagline}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-sand-400 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-ember-500 group-hover:text-ember-400 transition-colors">
                    Read docs
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
