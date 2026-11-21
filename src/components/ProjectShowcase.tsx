import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Code2, Eye, Github, Star, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { projects, type PortfolioProject, type ProjectCategory } from "@/data/portfolio";

import { Button, ButtonLink } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Software",
  "AI/ML",
  "IoT",
  "Mobile",
  "Embedded Systems",
];

function ProjectCard({
  project,
  index,
  onDetails,
}: {
  project: PortfolioProject;
  index: number;
  onDetails: () => void;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      layout
      className={`project-card glass-panel ${project.featured ? "featured" : ""}`}
      {...(!reducedMotion && { whileHover: { y: -5 } })}
      transition={{ duration: 0.2 }}
    >
      <div className="project-image">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} - ${project.imageLabel}`}
            className="project-photo"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ImagePlaceholder
            label={project.imageLabel}
            title={project.title}
            className="project-placeholder"
          />
        )}
        <span>{project.category}</span>
        {project.featured && (
          <strong className="featured-label">
            <Star size={12} aria-hidden="true" /> Featured
          </strong>
        )}
      </div>

      <div className="project-body">
        <p className="project-index">Project {String(index + 1).padStart(2, "0")}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="tech-row" aria-label={`${project.title} technologies`}>
          {project.technologies.slice(0, 5).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github size={15} aria-hidden="true" /> Repository
            </a>
          )}
          {project.secondaryGithub && (
            <a href={project.secondaryGithub} target="_blank" rel="noreferrer">
              <Code2 size={15} aria-hidden="true" /> Frontend
            </a>
          )}
          <button type="button" onClick={onDetails}>
            <Eye size={15} aria-hidden="true" /> Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDialog({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="project-dialog glass-panel"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
      >
        <Button
          ref={closeButtonRef}
          variant="icon"
          className="dialog-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={18} />
        </Button>
        <p className="eyebrow">{project.category} · Project details</p>
        <h3 id={titleId}>{project.title}</h3>
        <p id={descriptionId}>{project.description}</p>

        <div className="dialog-tech" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <span key={technology}>
              <Check size={12} aria-hidden="true" /> {technology}
            </span>
          ))}
        </div>

        {project.github ? (
          <ButtonLink href={project.github} target="_blank" rel="noreferrer">
            <Github size={16} aria-hidden="true" /> View repository
          </ButtonLink>
        ) : (
          <p className="repository-note">
            This project is documented in the portfolio while its public repository is unavailable.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export function ProjectShowcase() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const reducedMotion = useReducedMotion();

  const filteredProjects = useMemo(
    () =>
      category === "All" ? projects : projects.filter((project) => project.category === category),
    [category],
  );

  return (
    <section id="projects" className="section projects-section section-anchor">
      <Reveal>
        <SectionHeading title="Selected engineering work" kicker="Projects" />
        <div className="filter-row" aria-label="Filter projects">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={item === category ? "active" : ""}
              aria-pressed={item === category}
            >
              {item}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const index = projects.indexOf(project);
            const card = (
              <ProjectCard project={project} index={index} onDetails={() => setSelected(project)} />
            );

            return reducedMotion ? (
              <div key={project.title}>{card}</div>
            ) : (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
              >
                {card}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
