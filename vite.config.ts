// The shared TanStack configuration supplies the router, React, Tailwind, Nitro,
// TypeScript path aliases, and development tooling used by this starter.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Route the production bundle through the application's SSR entry point.
    server: { entry: "server" },
  },
});
