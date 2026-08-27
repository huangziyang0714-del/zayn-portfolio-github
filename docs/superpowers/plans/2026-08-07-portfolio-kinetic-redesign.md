# Portfolio Kinetic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Zayn's existing portfolio as a warm-dark, kinetic, recruiter-friendly visual experience while preserving all eight projects, bilingual content, resume data, project modals, and embedded project routes.

**Architecture:** Keep the existing React + Vite hash-based page shell and `src/data.js` content source. Move scroll storytelling into an isolated GSAP Hero component, move the work index into an accessible accordion component, and let `App.jsx` own routing, language, modal, and embedded viewer state. Replace the accumulated stylesheet with one token-driven responsive system and self-host Inter through a package import.

**Tech Stack:** React 19, Vite 7, GSAP 3 + ScrollTrigger, `@gsap/react`, native CSS, `@fontsource-variable/inter`

## Global Constraints

- Preserve project order, project categories, project copy, artwork paths, and embedded URLs for all eight projects.
- Preserve `#top`, `#work`, `#about`, and `#contact` anchors and the existing hash navigation behavior.
- Preserve Chinese and English switching, resume details, portrait, school logo, hobbies, email, and phone.
- Use one dark theme with `#f24d29` as the only accent, charcoal and burgundy surfaces, and off-white text.
- Use Inter variable locally for all display and text styles; hierarchy comes from width, weight, scale, and opacity.
- Desktop is primary; every asymmetric or horizontal layout must have an explicit single-column mobile fallback below 768px.
- Motion must use GSAP ScrollTrigger, IntersectionObserver, or CSS transitions; no scroll-position React state and no `window` scroll listener.
- Honor `prefers-reduced-motion`; every pinned or scrubbed effect must collapse to static content.
- Do not change project routes, nav labels, contact details, or legal copy.
- Do not add fake metrics, status panels, version labels, scroll prompts, custom cursor, decorative grid lines, or filler project content.

---

### Task 1: Establish the local type and visual token system

**Files:**
- Modify: `package.json`
- Modify: `src/main.jsx`
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: existing Vite entry point and global stylesheet.
- Produces: locally loaded `InterVariable`, CSS tokens `--accent`, `--ink`, `--wine`, `--paper`, `--muted`, `--line`, `--ease-out`, and a consistent 12px container radius / pill-control shape rule.

- [ ] **Step 1: Confirm the dependency is absent**

Run: `npm ls @fontsource-variable/inter`

Expected: dependency is not installed.

- [ ] **Step 2: Install the local variable font package**

Run: `npm install @fontsource-variable/inter`

Expected: `package.json` and lockfile include `@fontsource-variable/inter`.

- [ ] **Step 3: Import the font locally and remove remote font links**

Add `import '@fontsource-variable/inter';` before `../styles.css` in `src/main.jsx`. Remove Google Fonts preconnect and stylesheet tags from `index.html`.

- [ ] **Step 4: Define the global token and accessibility baseline**

Replace legacy global values with the locked warm-dark palette, visible `:focus-visible` states, reduced-motion overrides, stable `100dvh` sizing, and a fixed grain pseudo-element that does not repaint with scrolling containers.

- [ ] **Step 5: Verify the app still compiles**

Run: `npm run build`

Expected: Vite exits with code 0 and emits `dist`.

### Task 2: Build the scroll-driven ZAYN Hero and floating navigation

**Files:**
- Create: `src/components/KineticHero.jsx`
- Modify: `src/App.jsx`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `lang: 'zh' | 'en'`, `text: copy[lang]`.
- Produces: `<KineticHero lang={lang} text={text} />` with `section#top`, no external state, and scoped GSAP cleanup through `useGSAP`.

- [ ] **Step 1: Add semantic Hero markup**

Create a 400vh `.kinetic-hero` with a sticky `min-height: 100dvh` stage, one short label, a giant `Z A Y N` letter composition, four concentric brand circles, one statement, and two unique-intent links to `#work` and `#about`.

- [ ] **Step 2: Implement the scroll story**

Use `gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 1 }})` to expand circles, separate letters, reveal two messages, and soften the stage before handing off to work. Register and revert the animation through `useGSAP({ scope: root })`.

- [ ] **Step 3: Add reduced-motion behavior**

When `prefers-reduced-motion` matches, do not create ScrollTrigger. Show the final readable Hero composition as a static first viewport.

- [ ] **Step 4: Replace the current engineering HUD navigation**

Keep existing links and language state, but render a single-line floating pill with a compact ZAYN wordmark, Work/About/Contact links, language button, and a mobile menu. Use IntersectionObserver on a sentinel instead of a scroll listener to toggle the condensed nav state.

- [ ] **Step 5: Check Hero content limits**

Confirm the initial viewport contains no more than one label, one headline composition, one short statement, and one CTA group. Remove telemetry, fake latency, metrics, version labels, and scroll cues.

### Task 3: Convert all eight projects into an accessible visual accordion

**Files:**
- Create: `src/components/ProjectAccordion.jsx`
- Modify: `src/App.jsx`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `projects`, `lang`, `text`, `filter`, `setFilter`, `onOpen(index)`.
- Produces: a desktop horizontal accordion and a mobile vertical accordion, with click, focus, Enter, and Space activation.

- [ ] **Step 1: Preserve filtering and ordering**

Derive visible items with `projects.filter(project => filter === 'all' || project.category === filter)` and use the original array index when calling `onOpen`.

- [ ] **Step 2: Implement active-item behavior**

Track one active project ID. Desktop active panels expand while inactive panels contract and dim; mobile panels expand vertically. Hover and focus update active state, and click opens the existing project modal.

- [ ] **Step 3: Use real project artwork without overlays**

Render the existing `project.image` as the primary visual. Keep project title, year, and type in a separate caption region outside the image. Do not add pills over the artwork.

- [ ] **Step 4: Make filtering a stable control**

Use a three-option segmented control with `aria-pressed`, visible focus treatment, and no layout jump when the project count changes.

- [ ] **Step 5: Verify every project is reachable**

Check the All view renders 8 projects, Graphic and Motion views match `src/data.js`, and keyboard activation opens the correct original index.

### Task 4: Restyle project modal and preserve embedded project viewing

**Files:**
- Modify: `src/App.jsx`
- Modify: `styles.css`

**Interfaces:**
- Consumes: existing `ProjectModal` and `ProjectViewer` state contracts.
- Produces: accessible full-screen project detail and iframe viewer with unchanged project links.

- [ ] **Step 1: Keep existing brand posters and artwork paths**

Retain Pack Trace and MCYH logo-poster treatments and the normal image path for other projects. Do not alter the three embedded project URLs.

- [ ] **Step 2: Recompose modal hierarchy**

Use a two-column desktop split and a one-column mobile layout. Place title, type, year, project intro, role, website link, and next-project action in a readable order with one accent color.

- [ ] **Step 3: Add modal transition and focus safety**

Animate only transform and opacity, keep Escape handling, focus the close control when opened, and disable the transition under reduced motion.

- [ ] **Step 4: Preserve project viewer behavior**

Keep the internal iframe, back action, external-window link, body lock, and route-relative URLs unchanged.

### Task 5: Recompose the About page in the same visual system

**Files:**
- Create: `src/components/AboutPage.jsx`
- Modify: `src/App.jsx`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `text: copy[lang]`.
- Produces: `<AboutPage text={text} />` with the existing portrait, concept image, strengths, experience, education, certificates, skills, facts, hobbies, and quote.

- [ ] **Step 1: Build the portrait-led opening**

Use the real portrait as the main first-viewport image inside an offset circular frame. Pair it with the existing two-line about headline and concise lead.

- [ ] **Step 2: Reframe strengths as a sticky editorial sequence**

Use one sticky statement column and three content blocks, avoiding three equal cards. Each block contains the original strength title and body.

- [ ] **Step 3: Rebuild experience as an expandable timeline**

Render the four real roles in one clean list with period, company, role, and description. Use sparse dividers and no fake phase numbering.

- [ ] **Step 4: Preserve education, certificates, skills, and hobbies**

Keep the school logo black treatment, all credential copy, four skill groups, facts, and four hobbies. Use an asymmetric grid with explicit mobile stacking.

- [ ] **Step 5: Apply repeatable reveal transitions**

Use the existing IntersectionObserver reveal hook for hierarchy-driven entrances and exits, with reduced-motion static fallback.

### Task 6: Build the full-screen contact finale

**Files:**
- Create: `src/components/ContactFooter.jsx`
- Modify: `src/App.jsx`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `text: copy[lang]`.
- Produces: `<ContactFooter text={text} />` with `footer#contact`, mail link, phone link, top link, and copyright.

- [ ] **Step 1: Create the image-filled type treatment**

Use the existing mountain asset behind oversized `ZAYN` type through CSS background clipping, with a subtle transform animation limited to the text surface.

- [ ] **Step 2: Keep contact actions clear**

Render one email CTA, one phone link, and one return-to-top icon action. Reuse the same contact label everywhere instead of inventing duplicate CTA wording.

- [ ] **Step 3: Add reduced-motion and contrast fallbacks**

Disable the background drift under reduced motion and provide solid off-white text when background clipping is unsupported.

### Task 7: Production verification and pre-flight audit

**Files:**
- Modify: `docs/superpowers/plans/2026-08-07-portfolio-kinetic-redesign.md`

**Interfaces:**
- Consumes: completed implementation.
- Produces: passing build, live preview, and checked design constraints.

- [ ] **Step 1: Build the production bundle**

Run: `npm run build`

Expected: exit code 0 with no JSX, CSS, or import errors.

- [ ] **Step 2: Run structural checks**

Run: `rg -n "window\.addEventListener\(['\"]scroll|SCROLL TO|GRID LATENCY|SYSTEM ONLINE|2023—2026|—|–" src styles.css index.html`

Expected: no forbidden scroll listener, fake HUD copy, scroll cues, or visible long-dash separators in the redesigned shell.

- [ ] **Step 3: Verify preserved content contracts**

Run checks confirming `projects.length === 8`, three embedded URLs still exist, `#top/#work/#about/#contact` IDs remain, and both `zh` and `en` copy branches are referenced.

- [ ] **Step 4: Start a stable preview server**

Run Vite preview on the first available localhost port, keep the process alive, and report the exact link.

- [ ] **Step 5: Run the Taste pre-flight**

Audit theme lock, one accent, radius rules, button contrast, CTA wrapping, Hero viewport fit, eyebrow count, mobile collapse, motivated motion, reduced motion, image use, navigation height, copy quality, and the absence of banned design tells.

