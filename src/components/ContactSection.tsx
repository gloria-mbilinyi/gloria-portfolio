import { Download, Github, Linkedin, Mail } from "lucide-react";

import { profile } from "@/data/portfolio";

import { ButtonLink } from "./Button";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <>
      <section id="contact" className="section contact-section section-anchor">
        <Reveal>
          <div className="contact-panel glass-panel">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s build something practical.</h2>
              <p>
                I am open to full-stack development internships, scholarships, hackathons,
                bootcamps, and thoughtful engineering collaborations.
              </p>

              <div className="contact-links">
                <a href={`mailto:${profile.email}`}>
                  <Mail size={18} aria-hidden="true" /> {profile.email}
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={18} aria-hidden="true" /> LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={18} aria-hidden="true" /> GitHub
                </a>
              </div>

              <ButtonLink className="contact-cv" href={profile.cvUrl} download>
                <Download size={17} aria-hidden="true" /> Download CV
              </ButtonLink>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </section>

      <footer>
        <div>
          <p>Designed and built by {profile.name}</p>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="#contact">Contact</a>
            <a href="#home">Back to top</a>
          </div>
        </div>
      </footer>
    </>
  );
}
