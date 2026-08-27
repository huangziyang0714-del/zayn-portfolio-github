(() => {
  "use strict";

  const root = document.documentElement;
  const sections = Array.from(document.querySelectorAll(".story-section"));
  const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));
  const progress = document.querySelector(".scroll-progress");
  const progressFill = document.querySelector(".scroll-progress__fill");
  const parallaxLayers = Array.from(document.querySelectorAll("[data-parallax]"));
  const splitTargets = Array.from(document.querySelectorAll("[data-split]"));
  const desktopMotion = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let frameRequested = false;
  let activeSectionId = "";

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  function splitText() {
    splitTargets.forEach((target) => {
      const original = target.dataset.originalText || target.textContent.trim();
      target.dataset.originalText = original;
      target.classList.remove("split-ready");
      target.removeAttribute("aria-label");
      target.textContent = original;

      if (!desktopMotion.matches) {
        return;
      }

      const fragment = document.createDocumentFragment();
      const tokens = original.match(/\S+|\s+/g) || [];
      let characterIndex = 0;

      tokens.forEach((token) => {
        if (/^\s+$/.test(token)) {
          fragment.append(document.createTextNode(token));
          return;
        }

        const word = document.createElement("span");
        word.className = "split-word";
        word.setAttribute("aria-hidden", "true");
        const characters = typeof Intl.Segmenter === "function"
          ? Array.from(new Intl.Segmenter("en", { granularity: "grapheme" }).segment(token), (entry) => entry.segment)
          : Array.from(token);

        characters.forEach((character) => {
          const span = document.createElement("span");
          span.className = "split-char";
          span.style.setProperty("--char-index", String(characterIndex));
          span.textContent = character;
          word.append(span);
          characterIndex += 1;
        });

        fragment.append(word);
      });

      target.textContent = "";
      target.setAttribute("aria-label", original);
      target.append(fragment);
      target.classList.add("split-ready");
    });
  }

  function revealSections() {
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-inview", "has-entered"));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inview", entry.isIntersecting);
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("has-entered");
        entry.target.classList.remove("is-past", "is-before");
      });
    }, {
      rootMargin: "-10% 0px -10% 0px",
      threshold: 0.08,
    });

    sections.forEach((section) => revealObserver.observe(section));
  }

  function setActiveSection(section) {
    if (!section || section.id === activeSectionId) {
      return;
    }

    activeSectionId = section.id;
    sections.forEach((item) => {
      item.classList.toggle("is-current", item === section);
    });
    sectionLinks.forEach((link) => {
      if (link.dataset.sectionLink === activeSectionId) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateSectionMotion() {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      sections.forEach((section) => {
        section.classList.add("is-inview");
        section.classList.remove("is-past", "is-before");
        section.style.removeProperty("--section-drift");
      });
      return;
    }

    const viewportHeight = window.innerHeight;
    const pastBoundary = viewportHeight * 0.12;
    const beforeBoundary = viewportHeight * 0.88;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isPast = rect.bottom <= pastBoundary;
      const isBefore = rect.top >= beforeBoundary;
      const exitProgress = clamp(
        (viewportHeight * 0.62 - rect.bottom) / (viewportHeight * 0.5),
        0,
        1,
      );

      section.classList.toggle("is-past", isPast);
      section.classList.toggle("is-before", isBefore);
      section.style.setProperty("--section-drift", `${(-exitProgress * 10).toFixed(2)}px`);
    });
  }

  function updateActiveSection() {
    const viewportMarker = window.innerHeight * 0.46;
    let closestSection = sections[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= viewportMarker && rect.bottom >= viewportMarker) {
        closestSection = section;
        closestDistance = 0;
        return;
      }

      const distance = Math.min(
        Math.abs(rect.top - viewportMarker),
        Math.abs(rect.bottom - viewportMarker),
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    setActiveSection(closestSection);
  }

  function updateProgress() {
    const scrollableDistance = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = clamp(window.scrollY / scrollableDistance, 0, 1);
    const percentage = Math.round(ratio * 100);
    progressFill.style.transform = `scaleX(${ratio})`;
    progress.setAttribute("aria-valuenow", String(percentage));
  }

  function clearParallax() {
    parallaxLayers.forEach((layer) => {
      layer.style.removeProperty("--parallax-y");
      layer.style.removeProperty("will-change");
    });
    document.body.dataset.parallaxMode = "disabled";
  }

  function updateParallax() {
    if (!desktopMotion.matches) {
      clearParallax();
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    parallaxLayers.forEach((layer) => {
      const section = layer.closest(".story-section");
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) {
        layer.style.removeProperty("will-change");
        return;
      }

      const sectionCenter = rect.top + rect.height / 2;
      const normalizedDistance = clamp((viewportCenter - sectionCenter) / window.innerHeight, -1.2, 1.2);
      const depth = Number.parseFloat(layer.dataset.parallax) || 0;
      const range = Number.parseFloat(layer.dataset.parallaxRange) || 80;
      const offset = normalizedDistance * depth * range;
      layer.style.willChange = "transform";
      layer.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    });
    document.body.dataset.parallaxMode = "enabled";
  }

  function updateFrame() {
    frameRequested = false;
    updateProgress();
    updateActiveSection();
    updateSectionMotion();
    updateParallax();
  }

  function requestFrame() {
    if (frameRequested) {
      return;
    }
    frameRequested = true;
    window.requestAnimationFrame(updateFrame);
  }

  function handleMotionPreferenceChange() {
    splitText();
    if (!desktopMotion.matches) {
      clearParallax();
    }
    updateSectionMotion();
    requestFrame();
  }

  function handleAnchorClick(event) {
    const link = event.currentTarget;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${target.id}`);
  }

  function initialize() {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-inview", "has-entered"));
    } else {
      sections[0]?.classList.add("is-inview", "has-entered");
      splitText();
      root.classList.add("motion-ready");
      revealSections();
    }

    sectionLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));
    document.querySelectorAll(".footer-links a, .story-brand").forEach((link) => {
      link.addEventListener("click", handleAnchorClick);
    });

    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame, { passive: true });
    window.addEventListener("load", () => {
      const deepLinkTarget = window.location.hash
        ? document.getElementById(window.location.hash.slice(1))
        : null;
      if (deepLinkTarget) {
        window.setTimeout(() => {
          const previousScrollBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = "auto";
          deepLinkTarget.scrollIntoView({ behavior: "auto", block: "start" });
          root.style.scrollBehavior = previousScrollBehavior;
          requestFrame();
        }, 0);
      }
      requestFrame();
    }, { once: true });
    desktopMotion.addEventListener("change", handleMotionPreferenceChange);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    document.fonts?.ready?.then(requestFrame);
    requestFrame();
  }

  initialize();
})();
