# Contact Motion Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore bidirectional section motion and replace the low-contrast contact composition with a clear, responsive ZAYN contact layout.

**Architecture:** Keep the existing React, CSS, and IntersectionObserver approach. Extend the global reveal observer with explicit exit state, then give the contact footer independently revealable groups so its hierarchy remains readable at every viewport.

**Tech Stack:** React 19, Vite, native CSS, IntersectionObserver, GSAP ScrollTrigger for the existing hero only.

## Global Constraints

- Preserve the existing Hero scroll animation and project interactions.
- Keep `#contact`, navigation, project URLs, and language behavior unchanged.
- Respect `prefers-reduced-motion`.
- Use the existing light palette and system blue accent.

### Task 1: Restore Section Motion

**Files:**
- Modify: `src/App.jsx`
- Modify: `styles.css`

- [x] Update `useReveal` so elements receive an exit class when they leave above the viewport and reset when they leave below it.
- [x] Define entry and exit transforms on `.reveal`, with the existing reduced-motion override remaining intact.
- [x] Verify the class transitions by inspecting the observer branches and the production build output.

### Task 2: Recompose Contact Footer

**Files:**
- Modify: `src/components/ContactFooter.jsx`
- Modify: `styles.css`

- [x] Replace the decorative background wordmark with a visible top-line wordmark.
- [x] Put the closing message and email action in separate layout regions so no text overlaps.
- [x] Add responsive mobile rules that stack the wordmark, heading, and email link without clipping.

### Task 3: Build And Visual Verification

**Files:**
- Modify: `design-qa.md`

- [x] Run `pnpm build`.
- [ ] Load the preview at desktop and mobile sizes. Blocked by the local browser URL policy in this session.
- [x] Confirm the reduced-motion override remains active and the compiled CSS contains the new responsive layout rules.
