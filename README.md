# Gloria Developer Portfolio

A responsive developer portfolio for **Gloria Beneth Mbilinyi**, a Computer Engineering student and full-stack developer interested in artificial intelligence, machine learning, IoT, embedded systems, and practical software engineering.

This portfolio was upgraded for **Datheon Full Stack Web Development Internship - Task 1: Personal Developer Portfolio & Project Showcase**. It presents Gloria's verified technical work, education, skills, contact information, and downloadable CV in an accessible single-page experience.

## Project Overview

The site is designed for internship reviewers, recruiters, collaborators, and other developers. It combines a concise personal introduction with project filtering, detailed project summaries, responsive navigation, theme controls, and clear contact actions.

The project preserves Gloria's original photographs and portfolio information while improving presentation, accessibility, maintainability, and production readiness.

## Key Features

- Professional hero and About sections
- Categorized technical skills
- Filterable project showcase with repository links
- Project detail dialogs
- Education and practical experience timelines
- Downloadable CV
- Verified GitHub, LinkedIn, and email contact links
- Responsive desktop, tablet, and mobile layouts
- Mobile hamburger navigation
- Persistent light and dark themes
- Smooth in-page navigation
- Reduced-motion support
- SEO and social-sharing metadata
- Accessible navigation, forms, dialogs, and controls

## Technology Stack

| Area          | Technologies                              |
| ------------- | ----------------------------------------- |
| Framework     | React 19, TanStack Start, TanStack Router |
| Language      | TypeScript                                |
| Styling       | Tailwind CSS 4, custom CSS design tokens  |
| Animation     | Motion for React                          |
| Forms         | React Hook Form, Zod                      |
| Icons         | Lucide React                              |
| Build tooling | Vite 8, Nitro                             |
| Quality       | ESLint, Prettier, TypeScript              |

## Project Architecture

```text
gloria-portfolio-src/
|-- public/                  # Public files, CV, robots.txt, favicon
|-- src/
|   |-- assets/images/      # Profile, training, and project images
|   |-- components/         # Portfolio sections and reusable UI
|   |-- data/portfolio.ts   # Portfolio content and project records
|   |-- lib/                # Shared utilities and error handling
|   |-- routes/             # TanStack file-based routes and metadata
|   |-- router.tsx          # Router configuration
|   |-- server.ts           # Server entry and SSR error handling
|   |-- start.ts            # TanStack Start middleware
|   `-- styles.css          # Theme tokens and responsive design
|-- package.json            # Scripts and dependencies
|-- tsconfig.json           # Strict TypeScript configuration
`-- vite.config.ts          # Vite and TanStack Start configuration
```

Portfolio content is centralized in `src/data/portfolio.ts`, while `src/components/Portfolio.tsx` composes the visitor experience. TanStack Start provides routing and server rendering, and the shared stylesheet defines the light/dark design system and responsive breakpoints.

## Installation and Local Development

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Git

### Setup

```bash
git clone https://github.com/gloria-mbilinyi/gloria-portfolio.git
cd gloria-portfolio
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:3000`.

### Available Commands

```bash
npm run dev         # Start the development server
npm run typecheck   # Check TypeScript without emitting files
npm run lint        # Run ESLint and formatting checks
npm run test        # Run portfolio functionality checks
npm run check       # Run the complete source-quality suite
npm run qa:browser  # Test the running site at http://127.0.0.1:4180
npm run build       # Create a production build
npm run preview     # Preview the production build locally
npm run format      # Format supported project files
```

## Featured Projects

- **TenderGuard Africa** - Agentic AI decision support for auditable public tender evaluation, built with Python, LangGraph, MCP, Qwen3, Ollama, and Pydantic.
- **Smart Clinic Management System** - Full-stack healthcare management platform with role-based access, appointments, authentication, and medical records.
- **DIT Smart Assistant** - Retrieval-Augmented Generation assistant for questions related to Dar es Salaam Institute of Technology.
- **Wild Animal Detection and Classification System** - TensorFlow CNN application for classifying nine wild animal species.
- **LiftSystem** - Accessible Arduino elevator prototype with sensing, controls, LCD feedback, and emergency features.

Additional software, mobile, IoT, embedded systems, and machine learning projects are available in the live portfolio and on GitHub.

## Responsive Design

The layout is mobile-first and adapts across compact phones, tablets, laptops, and wide desktop screens. Navigation collapses into a keyboard-accessible mobile menu, project and skill grids reflow at smaller widths, and typography uses fluid sizing where appropriate.

## Testing and Quality Assurance

Before release, run the source checks and production build:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

For repeatable browser QA, start the development server on the test port in one terminal and run the browser suite in another:

```bash
npm run dev -- --host 127.0.0.1 --port 4180 --strictPort
npm run qa:browser
```

The browser suite launches isolated headless Chrome sessions at 1440 x 1000 and 390 x 844. It verifies viewport overflow, theme switching, mobile navigation, project filtering, the SafariSmart detail dialog and screenshot, CV availability, contact links, metadata, and browser-console errors.

Manual QA covers:

- Navigation and active-section behavior
- Mobile menu operation
- Light/dark theme persistence
- Project filtering and dialogs
- CV download
- Contact links and form behavior
- Keyboard navigation and reduced motion
- Desktop and mobile responsive layouts

## Screenshots

### Desktop

![Desktop AI and machine-learning project cards in dark mode](docs/screenshots/portfolio-desktop.png)

### Mobile navigation

![Mobile portfolio navigation in dark mode](docs/screenshots/portfolio-mobile.png)

## Live Demo

No production URL is claimed until a deployment has been authenticated and verified. The current Nitro build is configured for Cloudflare and generates the required Wrangler metadata.

```bash
npm install
npx wrangler login
npm run build
npx nitro deploy --prebuilt
```

After deployment, open the URL returned by Wrangler, verify the homepage and CV download, then add the confirmed URL to this section.

## GitHub Repository

[github.com/gloria-mbilinyi/gloria-portfolio](https://github.com/gloria-mbilinyi/gloria-portfolio)

## Developer Information

**Gloria Beneth Mbilinyi**

Computer Engineering Student | Full-Stack Developer | AI & Machine Learning Enthusiast

- GitHub: [github.com/gloria-mbilinyi](https://github.com/gloria-mbilinyi)
- LinkedIn: [linkedin.com/in/gloria-mbilinyi](https://www.linkedin.com/in/gloria-mbilinyi/)
- Email: [gloriambilinyi5@gmail.com](mailto:gloriambilinyi5@gmail.com)

## Internship Assignment Information

- **Program:** Datheon Full Stack Web Development Internship
- **Assignment:** Task 1 - Personal Developer Portfolio & Project Showcase
- **Objective:** Deliver a professional, responsive portfolio that presents personal information, technical skills, featured projects, repository links, a downloadable CV, and working contact details.

## License

This repository contains Gloria's personal portfolio content and photographs. Please request permission before reusing personal assets or biographical content.
