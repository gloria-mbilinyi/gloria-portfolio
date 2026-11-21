import { BriefcaseBusiness, Code2, Cpu, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import {
  education,
  experiences,
  featuredRepositories,
  photos,
  profile,
  skillGroups,
} from "@/data/portfolio";

import { ButtonLink } from "./Button";
import { ContactSection } from "./ContactSection";
import { Navbar } from "./Navbar";
import { ProjectShowcase } from "./ProjectShowcase";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("portfolio-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function Hero() {
  return (
    <section id="home" className="hero section-anchor">
      <Reveal className="hero-copy">
        <p className="eyebrow">Computer Engineering · Full-Stack Development</p>
        <h1>
          Gloria Beneth <span>Mbilinyi</span>
        </h1>
        <p className="hero-title">{profile.shortTitle}</p>
        <p className="hero-lead">
          I build practical software across full-stack development, AI-powered applications, IoT,
          and embedded systems, connecting thoughtful interfaces with reliable engineering.
        </p>

        <div className="hero-actions">
          <ButtonLink href="#projects">
            <Code2 size={17} aria-hidden="true" /> View projects
          </ButtonLink>
          <ButtonLink variant="secondary" href={profile.cvUrl} download>
            <Download size={17} aria-hidden="true" /> Download CV
          </ButtonLink>
          <ButtonLink variant="secondary" href="#contact">
            <Mail size={17} aria-hidden="true" /> Contact me
          </ButtonLink>
        </div>

        <div className="social-row" aria-label="Professional profiles">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={17} aria-hidden="true" /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={17} aria-hidden="true" /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={17} aria-hidden="true" /> Email
          </a>
        </div>

        <div className="availability">
          <BriefcaseBusiness size={17} aria-hidden="true" />
          <strong>Open to full-stack internships and engineering collaborations</strong>
        </div>
      </Reveal>

      <Reveal className="profile-wrap" delay={0.08}>
        <div className="profile-frame glass-panel">
          <img
            src={photos.profile}
            alt="Gloria Beneth Mbilinyi"
            className="profile-photo"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="profile-note">
            <div>
              <small>Currently</small>
              <strong>BEng · Dar es Salaam Institute of Technology</strong>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function AboutAndSkills() {
  return (
    <>
      <section id="about" className="section section-anchor">
        <Reveal>
          <SectionHeading title="Engineering with purpose" kicker="About me" />
          <div className="about-grid">
            <p className="about-lead">
              I turn real-world problems into practical technical solutions.
            </p>
            <div>
              <p>
                I am pursuing a Bachelor of Engineering in Computer Engineering at Dar es Salaam
                Institute of Technology, building experience across full-stack software, artificial
                intelligence, IoT, embedded systems, and computer networking.
              </p>
              <p>
                My work connects code with physical systems - from secure healthcare platforms and
                RAG assistants to accessible control systems and environmental sensor networks.
              </p>
            </div>
            <figure className="about-photo">
              <img
                src={photos.coding}
                alt="Gloria coding on her laptop during a technology session"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Coding during a Tech for a Better Tomorrow session</figcaption>
            </figure>
            <dl>
              <div>
                <dt>9</dt>
                <dd>Portfolio projects</dd>
              </div>
              <div>
                <dt>5</dt>
                <dd>Project categories</dd>
              </div>
              <div>
                <dt>4.6</dt>
                <dd>Diploma GPA</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="section section-anchor">
        <Reveal>
          <SectionHeading title="Technical capabilities" kicker="Skills" />
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={Math.min(index * 0.03, 0.18)}>
              <article className="skill-card glass-panel">
                <div className="skill-top">
                  <Code2 size={18} aria-hidden="true" />
                </div>
                <h3>{group.title}</h3>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function ExperienceAndEducation() {
  return (
    <>
      <section id="experience" className="section section-anchor">
        <Reveal>
          <SectionHeading title="Experience and technical practice" kicker="Practice" />
        </Reveal>
        <div className="experience-grid">
          {experiences.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="experience-card glass-panel">
                {index === 1 && (
                  <img
                    src={photos.pcb}
                    alt="Gloria soldering a PCB during hands-on engineering practice"
                    className="experience-photo"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="experience-icon">
                  {index === 0 ? (
                    <BriefcaseBusiness aria-hidden="true" />
                  ) : (
                    <Cpu aria-hidden="true" />
                  )}
                </div>
                <p className="eyebrow">{item.type}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.status}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="education" className="section section-anchor">
        <Reveal>
          <SectionHeading title="Education" kicker="Timeline" />
          <div className="timeline glass-panel">
            {education.map((item, index) => (
              <article key={item.period}>
                <div className="timeline-marker" aria-hidden="true">
                  <span className={index === 0 ? "current" : ""} />
                </div>
                <p className="timeline-period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                </div>
                <strong>{item.note}</strong>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

function GitHubSection() {
  return (
    <section className="section github-section" aria-labelledby="github-heading">
      <Reveal>
        <div className="github-panel">
          <div className="github-copy">
            <p className="eyebrow">Open source · gloria-mbilinyi</p>
            <h2 id="github-heading">Building in public, one practical system at a time.</h2>
            <p>
              Explore the source code behind my software, AI, mobile, and embedded engineering
              projects.
            </p>
            <ButtonLink href={profile.github} target="_blank" rel="noreferrer">
              <Github size={17} aria-hidden="true" /> Explore my GitHub
            </ButtonLink>
          </div>

          <div className="github-visual glass-panel">
            <div className="github-header">
              <Code2 size={20} aria-hidden="true" />
              <span>Featured repositories</span>
              <strong>Public work</strong>
            </div>
            <div className="repo-list">
              {featuredRepositories.map((name) => (
                <a key={name} href={`${profile.github}/${name}`} target="_blank" rel="noreferrer">
                  <Github size={15} aria-hidden="true" />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Portfolio() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className="portfolio-shell">
      <div className="technical-grid" aria-hidden="true" />
      <Navbar theme={theme} onTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <AboutAndSkills />
        <ProjectShowcase />
        <ExperienceAndEducation />
        <GitHubSection />
        <ContactSection />
      </main>
    </div>
  );
}
