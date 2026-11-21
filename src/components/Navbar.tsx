import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navItems } from "@/data/portfolio";

import { Button } from "./Button";

type Theme = "light" | "dark";

const sectionIds = navItems.map((item) => item.toLowerCase());

export function Navbar({ theme, onTheme }: { theme: Theme; onTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60%", threshold: 0 },
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="navbar glass-panel">
        <a href="#home" className="brand" aria-label="Gloria Beneth Mbilinyi, home">
          <span>GB</span>
          <strong>Gloria Beneth</strong>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "page" : undefined}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <span className="study-mark">DIT · BEng</span>
          <Button
            variant="icon"
            onClick={onTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </Button>
          <Button
            variant="icon"
            className="mobile-menu-button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav glass-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const id = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={active === id ? "active" : ""}
                  aria-current={active === id ? "page" : undefined}
                >
                  {item}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
