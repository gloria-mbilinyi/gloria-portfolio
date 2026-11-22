import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const previewUrl = new URL(process.argv[2] ?? "http://127.0.0.1:4180/");
assert.equal(previewUrl.hostname, "127.0.0.1", "Browser QA is restricted to loopback");
assert.equal(previewUrl.protocol, "http:", "Browser QA expects a local HTTP preview");

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));
assert.ok(chromePath, "Google Chrome was not found; set CHROME_PATH to its executable");

const screenshotDirectory = resolve("docs", "screenshots");

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

async function connectToChrome(child) {
  const webSocketUrl = await new Promise((resolveUrl, rejectUrl) => {
    let output = "";
    const timeout = setTimeout(
      () => rejectUrl(new Error(`Chrome did not expose CDP: ${output}`)),
      15000,
    );

    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timeout);
        resolveUrl(match[1]);
      }
    });
    child.once("exit", (code) => {
      clearTimeout(timeout);
      rejectUrl(new Error(`Chrome exited before CDP was ready (code ${code}): ${output}`));
    });
  });

  const socket = new WebSocket(webSocketUrl);
  await new Promise((resolveSocket, rejectSocket) => {
    socket.addEventListener("open", resolveSocket, { once: true });
    socket.addEventListener("error", rejectSocket, { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  const eventListeners = new Set();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      if (!handler) return;
      if (message.error) handler.reject(new Error(message.error.message));
      else handler.resolve(message.result);
      return;
    }
    for (const listener of eventListeners) listener(message);
  });

  function send(method, params = {}, sessionId) {
    const id = ++nextId;
    return new Promise((resolveCommand, rejectCommand) => {
      pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
      socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  return {
    send,
    onEvent(listener) {
      eventListeners.add(listener);
    },
    close() {
      socket.close();
    },
  };
}

async function runScenario({ name, width, height, mobile }) {
  const profileDirectory = mkdtempSync(join(tmpdir(), `gloria-portfolio-${name}-`));
  const child = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDirectory}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"], windowsHide: true },
  );
  let cdp;

  try {
    cdp = await connectToChrome(child);
    const { targetInfos } = await cdp.send("Target.getTargets");
    const pageTarget = targetInfos.find((target) => target.type === "page");
    assert.ok(pageTarget, "Chrome page target was not available");
    const { sessionId } = await cdp.send("Target.attachToTarget", {
      targetId: pageTarget.targetId,
      flatten: true,
    });

    const browserErrors = [];
    cdp.onEvent((message) => {
      if (message.sessionId !== sessionId) return;
      if (message.method === "Runtime.exceptionThrown") {
        browserErrors.push(message.params.exceptionDetails.text);
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        browserErrors.push(
          message.params.args
            .map((argument) => argument.value ?? argument.description ?? "error")
            .join(" "),
        );
      }
    });

    const send = (method, params = {}) => cdp.send(method, params, sessionId);
    const evaluate = async (expression) => {
      const result = await send("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
      return result.result.value;
    };

    await send("Runtime.enable");
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
    });
    await send("Page.navigate", { url: previewUrl.href });

    for (let attempt = 0; attempt < 80; attempt += 1) {
      if ((await evaluate("document.readyState")) === "complete") break;
      await delay(100);
    }
    await delay(500);

    const initial = await evaluate(`(() => ({
      title: document.title,
      innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      heading: document.querySelector("h1")?.textContent?.replace(/\\s+/g, " ").trim(),
      projects: document.querySelectorAll(".project-card").length,
      cvHref: document.querySelector("a[download]")?.getAttribute("href"),
      mailHref: document.querySelector('a[href^="mailto:"]')?.getAttribute("href"),
      linkedinHref: document.querySelector('a[href*="linkedin.com"]')?.getAttribute("href"),
      githubHref: document.querySelector('a[href*="github.com"]')?.getAttribute("href"),
      menuVisible: getComputedStyle(document.querySelector(".mobile-menu-button")).display !== "none",
      dark: document.documentElement.classList.contains("dark"),
      smoothScroll: getComputedStyle(document.documentElement).scrollBehavior,
      navItems: document.querySelectorAll(".desktop-nav a").length,
    }))()`);

    assert.match(initial.title, /Gloria Beneth Mbilinyi/);
    assert.match(initial.heading, /Gloria Beneth Mbilinyi/);
    assert.equal(initial.innerWidth, width);
    assert.equal(initial.documentWidth, width, `${name}: document overflows horizontally`);
    assert.equal(initial.bodyWidth, width, `${name}: body overflows horizontally`);
    assert.equal(initial.projects, 9);
    assert.equal(initial.cvHref, "/gloria-beneth-mbilinyi-cv.pdf");
    assert.match(initial.mailHref, /gloriambilinyi5@gmail\.com/);
    assert.match(initial.linkedinHref, /linkedin\.com\/in\/gloria-mbilinyi/);
    assert.match(initial.githubHref, /github\.com\/gloria-mbilinyi/);
    assert.equal(initial.smoothScroll, "smooth");
    assert.equal(initial.navItems, 7);

    const cvResponse = await evaluate(`fetch("/gloria-beneth-mbilinyi-cv.pdf", { method: "HEAD" })
      .then((response) => ({ status: response.status, type: response.headers.get("content-type") }))`);
    assert.equal(cvResponse.status, 200);
    assert.match(cvResponse.type ?? "", /pdf/);

    await evaluate("document.querySelector('[aria-label^=\"Switch to\"]').click()");
    await delay(150);
    const theme = await evaluate(`(() => ({
      dark: document.documentElement.classList.contains("dark"),
      stored: localStorage.getItem("portfolio-theme"),
    }))()`);
    assert.notEqual(theme.dark, initial.dark);
    assert.equal(theme.stored, theme.dark ? "dark" : "light");

    if (mobile) {
      assert.equal(initial.menuVisible, true);
      await evaluate('document.querySelector(".mobile-menu-button").click()');
      await delay(150);
      const menu = await evaluate(`(() => {
        const button = document.querySelector(".mobile-menu-button");
        return {
          expanded: button.getAttribute("aria-expanded"),
          links: document.querySelectorAll(".mobile-nav a").length,
        };
      })()`);
      assert.equal(menu.expanded, "true");
      assert.equal(menu.links, 7);
    } else {
      assert.equal(initial.menuVisible, false);
      const filtered = await evaluate(`(() => {
        [...document.querySelectorAll(".filter-row button")]
          .find((button) => button.textContent.trim() === "AI/ML")
          .click();
        return true;
      })()`);
      assert.equal(filtered, true);
      await delay(350);
      const projectState = await evaluate(`(() => {
        const cards = [...document.querySelectorAll(".project-card")];
        const safariSmart = cards.find((card) => card.querySelector("h3")?.textContent === "SafariSmart AI Concierge");
        safariSmart?.querySelector("button")?.click();
        return {
          count: cards.length,
          hasSafariSmart: Boolean(safariSmart),
          hasImage: safariSmart?.querySelector("img")?.alt.includes("SafariSmart AI Concierge"),
        };
      })()`);
      assert.equal(projectState.count, 5);
      assert.equal(projectState.hasSafariSmart, true);
      assert.equal(projectState.hasImage, true);
      await delay(250);
      const dialog = await evaluate(`(() => ({
        open: Boolean(document.querySelector('[role="dialog"]')),
        title: document.querySelector('[role="dialog"] h3')?.textContent,
        featureCount: document.querySelectorAll('[role="dialog"] .dialog-tech span').length,
      }))()`);
      assert.equal(dialog.open, true);
      assert.equal(dialog.title, "SafariSmart AI Concierge");
      assert.equal(dialog.featureCount, 7);
      await evaluate("document.querySelector('[aria-label=\"Close project details\"]').click()");
      await delay(300);
      await evaluate(`(() => {
        document.documentElement.style.scrollBehavior = "auto";
        [...document.querySelectorAll(".project-card")]
          .find((card) => card.querySelector("h3")?.textContent === "SafariSmart AI Concierge")
          ?.scrollIntoView({ block: "center" });
      })()`);
      await delay(700);
    }

    const screenshot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
      fromSurface: true,
    });
    writeFileSync(join(screenshotDirectory, `portfolio-${name}.png`), screenshot.data, "base64");

    assert.deepEqual(browserErrors, [], `${name}: browser console errors were reported`);
    return { name, ...initial, cvStatus: cvResponse.status, browserErrors };
  } finally {
    try {
      await cdp?.send("Browser.close");
    } catch {
      child.kill();
    }
    cdp?.close();
    if (child.exitCode === null) {
      await Promise.race([
        new Promise((resolveExit) => child.once("exit", resolveExit)),
        delay(2000),
      ]);
    }
    if (child.exitCode === null) child.kill();
    await delay(300);
    rmSync(profileDirectory, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 200,
    });
  }
}

const results = [];
results.push(await runScenario({ name: "desktop", width: 1440, height: 1000, mobile: false }));
results.push(await runScenario({ name: "mobile", width: 390, height: 844, mobile: true }));

console.log(JSON.stringify(results, null, 2));
console.log(`Browser QA passed for ${previewUrl.href}`);
