import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";

/**
 * Shared layout options used by every Fumadocs layout (docs, home, search).
 * Keeps nav consistent across routes.
 *
 * The nav links point to the four product documentation sections:
 * Platform, SDK, Runtime, and Agent.
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo size="sm" />,
  },
  links: [
    {
      text: "Platform",
      url: "/docs/platform",
      active: "nested-url",
    },
    {
      text: "SDK",
      url: "/docs/sdk",
      active: "nested-url",
    },
    {
      text: "Runtime",
      url: "/docs/runtime",
      active: "nested-url",
    },
    {
      text: "Agent",
      url: "/docs/agent",
      active: "nested-url",
    },
  ],
};
