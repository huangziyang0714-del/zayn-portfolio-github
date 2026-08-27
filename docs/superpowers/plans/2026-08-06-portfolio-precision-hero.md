# Portfolio Precision Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Zayn's portfolio shell and first viewport into a dark precision-engineering visual system while preserving the existing project section, project ordering, and project links.

**Architecture:** Keep the current React/Vite single-page structure and replace only the header and home Hero markup with focused components. Add lightweight pointer and counter behavior in React, with all visual layers and responsive states in the existing global stylesheet. Reuse the existing mountain photograph as the real media asset and retain all Work component data and project-card markup.

**Tech Stack:** React 19, Vite 7, CSS, existing GSAP-based reveal components.

## Global Constraints

- PC presentation is primary; mobile must remain fully usable at 664px and below.
- Preserve the complete `Work` component, project data, filters, modal behavior, and embedded project URLs.
- Palette: `#07080a` charcoal, cool white, chrome gray, `#dfff00` status accent.
- Navigation remains transparent over the Hero without blur or a visible panel.
- Respect `prefers-reduced-motion` and keep controls at least 44px on touch layouts.
- Do not add external CDN dependencies or remote video that can fail when the local site is opened.

---

### Task 1: Precision Header and Hero Structure

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: existing `text`, `lang`, hash navigation, `usePageReady`, and `useSceneTransitions`.
- Produces: `PrecisionMark`, `TelemetryPanel`, `HeroMetric`, and the new `Hero` markup.

- [ ] **Step 1: Add semantic Hero subcomponents**

Create a geometric brand mark, a live-status telemetry panel, and three real portfolio metrics: projects, disciplines, and availability.

- [ ] **Step 2: Replace the old title-only Hero**

Render an overline, four-line name/role statement, bilingual supporting copy, primary portfolio link, About link, telemetry panel, and bottom metrics strip.

- [ ] **Step 3: Add pointer-driven Hero light tracking**

Update CSS custom properties `--hero-pointer-x` and `--hero-pointer-y` from local pointer coordinates without mutating global state.

### Task 2: Precision Visual System and Motion

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: the class names added in Task 1 and existing `body.is-ready` loader state.
- Produces: transparent header, chrome typography, media/grid/vignette layers, HUD brackets, progress bars, responsive layouts, and smooth entrance/exit states.

- [ ] **Step 1: Replace header styling**

Remove the header blur panel and border, add geometric mark/wordmark lockup, technical navigation labels, and a restrained outline contact action.

- [ ] **Step 2: Replace Hero styling**

Build the full-viewport 12-column composition with mountain media, radial vignette, 60px technical grid, pointer spotlight, wide typography, telemetry HUD, and metrics bar.

- [ ] **Step 3: Add entrance, hover, and reduced-motion states**

Sequence the overline, title lines, actions, HUD, and metrics after the loader. Limit hover effects to fill/translation/scale and disable looping motion under reduced motion.

- [ ] **Step 4: Preserve the Work component presentation**

Do not alter `.work-section`, `.project-grid`, project data, or card structure. Remove the image color-shift behavior on project-card hover while retaining subtle image scale.

- [ ] **Step 5: Add tablet and mobile layouts**

Stack content cleanly, hide the desktop HUD below tablet width, keep the first viewport's key identity visible, and retain touch-sized controls.

### Task 3: Build and Browser Verification

**Files:**
- Verify: `dist/`

**Interfaces:**
- Consumes: the built Vite output.
- Produces: a working local preview URL and verified desktop/mobile screenshots.

- [ ] **Step 1: Build the production bundle**

Run `npm run build` and require exit code 0 with no Vite errors.

- [ ] **Step 2: Start or restart the static preview**

Serve `dist` on an available local port and verify an HTTP 200 response.

- [ ] **Step 3: Verify interaction and responsive layout**

Open the portfolio at desktop and 664px-wide viewports, verify no overlap, scroll to Work, confirm filters and one project card remain interactive, and check the browser console for errors.

