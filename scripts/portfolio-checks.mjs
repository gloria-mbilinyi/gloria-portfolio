import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const data = read("src/data/portfolio.ts");
const portfolio = read("src/components/Portfolio.tsx");
const contact = read("src/components/ContactForm.tsx");
const contactSection = read("src/components/ContactSection.tsx");
const projectShowcase = read("src/components/ProjectShowcase.tsx");
const route = read("src/routes/index.tsx");
const readme = read("README.md");
const siteSource = [data, portfolio, contact, contactSection, projectShowcase, route].join("\n");

assert.match(data, /https:\/\/github\.com\/gloria-mbilinyi/);
assert.match(data, /https:\/\/www\.linkedin\.com\/in\/gloria-mbilinyi\//);
assert.match(data, /gloriambilinyi5@gmail\.com/);
assert.match(data, /TenderGuard Africa/);
assert.match(data, /\/gloria-beneth-mbilinyi-cv\.pdf/);
assert.match(portfolio, /id="main-content"/);
assert.match(contact, /mailto:\$\{profile\.email\}/);
assert.match(contactSection, /download/);
assert.match(projectShowcase, /aria-pressed/);
assert.match(route, /Full-Stack Developer/);
assert.match(route, /index, follow/);
assert.match(route, /twitter:description/);
assert.match(readme, /Datheon Full Stack Web Development Internship/);

for (const staleText of [
  "Welcome to your Lovable project",
  "github.com/prettyglory",
  "LinkedIn link pending",
  "Email available on request",
  "Organization to add",
  "Details to add",
]) {
  assert.equal(siteSource.includes(staleText), false, `Found stale content: ${staleText}`);
}

const cvPath = join(root, "public", "gloria-beneth-mbilinyi-cv.pdf");
assert.ok(existsSync(cvPath), "The downloadable CV PDF is missing");
assert.equal(readFileSync(cvPath).subarray(0, 5).toString(), "%PDF-", "CV is not a valid PDF");

console.log("Portfolio content, links, metadata, and CV checks passed.");
