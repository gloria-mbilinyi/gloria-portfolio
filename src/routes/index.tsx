import { createFileRoute } from "@tanstack/react-router";

import { Portfolio } from "@/components/Portfolio";

const title = "Gloria Beneth Mbilinyi | Full-Stack Developer";
const description =
  "Portfolio of Gloria Beneth Mbilinyi, a Computer Engineering student building full-stack, AI, IoT, and embedded systems projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Gloria Mbilinyi, full-stack developer, computer engineering, AI, IoT, embedded systems, Tanzania",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Portfolio,
});
