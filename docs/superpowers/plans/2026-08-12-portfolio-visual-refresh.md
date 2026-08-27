# Portfolio Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the existing ZAYN portfolio into a clearer, more credible editorial portfolio while preserving every project, route, external link, and scroll-driven hero interaction.

**Architecture:** Keep the React component tree and data contracts unchanged. Apply a targeted evolution through shared CSS tokens, typography hierarchy, section rhythm, gallery presentation, and responsive states, then verify the existing GSAP and modal behavior in the browser.

**Tech Stack:** React 19, Vite 7, native CSS, GSAP ScrollTrigger, local Fontsource assets

## Global Constraints

- Preserve `#top`, `#work`, `#about`, and `#contact` anchors.
- Preserve all project order, titles, poster assets, and destinations.
- Keep the hero controlled by scroll and never auto-play it.
- Use one light page theme, one coral accent, and one 4px corner-radius system.
- Do not add gradients, decorative blobs, glass cards, nested cards, or new dependencies.
- Keep all motion compatible with `prefers-reduced-motion`.

---

### Task 1: Recalibrate the shared visual system

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: Existing CSS custom properties and component class names.
- Produces: Updated palette, type scale, radius, focus, loader, header, and action states.

- [ ] **Step 1: Replace the brown theme tokens with cool neutral tokens**

Set the page canvas to `#eef0eb`, primary text to `#171914`, secondary text to `rgba(23,25,20,.62)`, and accent to `#ef4e2b`.

- [ ] **Step 2: Remove the fixed texture overlay**

Disable `body::after` so the page reads as a clean solid surface.

- [ ] **Step 3: Normalize controls and navigation**

Use a 4px radius for framed controls, maintain circular icon buttons, and provide clear hover, active, and keyboard focus states.

- [ ] **Step 4: Verify the base page**

Run: `pnpm run build`

Expected: Vite completes without warnings or errors.

### Task 2: Refine hero and work presentation

**Files:**
- Modify: `styles.css`
- Preserve: `src/components/KineticHero.jsx`
- Preserve: `src/components/ProjectAccordion.jsx`

**Interfaces:**
- Consumes: Existing GSAP selectors and project data.
- Produces: A solid-background kinetic hero and editorial project grid without behavioral changes.

- [ ] **Step 1: Recompose hero typography**

Reduce the headline scale, increase edge alignment, establish label/body hierarchy, and keep both CTAs above the fold.

- [ ] **Step 2: Replace decorative circles with graphic fields**

Keep the four animated DOM elements required by the timeline but render them as sharp geometric color fields instead of floating circular blobs.

- [ ] **Step 3: Refine the gallery rhythm**

Keep the lead project full-width and following projects asymmetric, while unifying poster borders, caption spacing, title hierarchy, and icon-only hover affordance.

- [ ] **Step 4: Verify interactions**

Confirm hero progress only changes with scrolling, gallery filtering works, and project modals still open the correct project.

### Task 3: Refine profile and contact sections

**Files:**
- Modify: `styles.css`
- Preserve: `src/components/AboutPage.jsx`
- Preserve: `src/components/ContactFooter.jsx`

**Interfaces:**
- Consumes: Existing resume copy, portrait, concept image, school mark, and contact links.
- Produces: Consistent profile hierarchy and a restrained contact conclusion in the same light theme.

- [ ] **Step 1: Normalize section headings and spacing**

Use smaller display headings, wider text measures, and clearer row separators for strengths, experience, skills, and facts.

- [ ] **Step 2: Preserve authentic imagery**

Keep the portrait in original color and remove the remaining filter from the concept image.

- [ ] **Step 3: Simplify the contact footer**

Keep it in the page theme, reduce the decorative wordmark opacity, and make email and phone actions readable at all widths.

- [ ] **Step 4: Verify content and links**

Confirm mail, phone, back-to-top, navigation, and Chinese/English switching still work.

### Task 4: Browser QA and taste pre-flight

**Files:**
- Verify: `styles.css`
- Verify: `src/**/*.jsx`

**Interfaces:**
- Consumes: The completed local build.
- Produces: A working localhost preview validated at desktop and mobile widths.

- [ ] **Step 1: Run production build**

Run: `pnpm run build`

Expected: Build succeeds with all 37 modules transformed.

- [ ] **Step 2: Inspect desktop rendering**

Check header, hero, project grid, modal, about page, and contact footer at approximately 1280x720.

- [ ] **Step 3: Inspect mobile rendering**

Check the same flows at approximately 390x844 and confirm `scrollWidth === clientWidth`.

- [ ] **Step 4: Run the taste pre-flight**

Confirm one theme, one accent, consistent radii, readable controls, restrained motion, reduced-motion fallback, no text overlap, no unintended image crop, and no console errors.
