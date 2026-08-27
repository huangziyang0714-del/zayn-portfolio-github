# Apple UI Portfolio Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Save the current portfolio as a restorable copy, then refresh its visual system with an Apple-inspired web UI while preserving all existing animation and interaction logic.

**Architecture:** Keep the React component tree, GSAP logic, project data, routes, and media unchanged. Implement the refresh through a scoped CSS override layer and existing design tokens so rollback remains simple and animation selectors retain their current behavior.

**Tech Stack:** React 19, Vite 7, native CSS, GSAP.

## Global Constraints

- Preserve every existing animation, scroll behavior, filter, modal, and embedded project link.
- Preserve all project content and media.
- Change only visual styling, responsive spacing, colors, surfaces, and typography treatment.
- Use a cold neutral palette with one system-blue accent.
- Use frosted-glass effects only where hierarchy requires them, with an opaque fallback.
- Verify desktop and mobile layouts, filters, project count, overflow, console errors, and production build.

---

### Task 1: Save Restorable Website Copy

**Files:**
- Create: `../zayn-portfolio-backup-gallery-20260826-2/`

**Interfaces:**
- Consumes: current `zayn-portfolio` source tree.
- Produces: a standalone source snapshot excluding generated dependencies and temporary files.

- [x] **Step 1: Confirm the destination does not already exist**
- [x] **Step 2: Copy source, public assets, project embeds, manifests, and current production build**
- [x] **Step 3: Compare key file counts and confirm the backup entry files exist**

### Task 2: Implement Apple-Inspired Visual System

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: existing class names and layout structure.
- Produces: new design tokens and a visual-only Apple UI override layer.

- [x] **Step 1: Replace the warm palette with cold neutral tokens and system blue**
- [x] **Step 2: Restyle navigation, controls, sections, cards, modal, resume panels, and footer**
- [x] **Step 3: Add reduced-transparency fallback without touching reduced-motion behavior**
- [x] **Step 4: Keep existing animation declarations and JavaScript unchanged**

### Task 3: Build and Visual QA

**Files:**
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: refreshed local build at a new cache-busted preview URL.
- Produces: verified desktop/mobile implementation and a QA record.

- [x] **Step 1: Run the production build**
- [x] **Step 2: Capture and inspect desktop hero, work, and about states**
- [x] **Step 3: Capture and inspect mobile hero and work states**
- [x] **Step 4: Test project filters, project modal, overflow, media loading, and console errors**
- [x] **Step 5: Record the final QA result and deliver the refreshed URL plus backup path**
