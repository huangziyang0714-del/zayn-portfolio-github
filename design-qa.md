# Apple UI Visual Refresh QA

source visual truth path: `docs/qa/apple-ui/source-before-hero.png`

implementation screenshot paths:

- `docs/qa/apple-ui/implementation-hero-desktop.png`
- `docs/qa/apple-ui/implementation-work-desktop.png`
- `docs/qa/apple-ui/implementation-about-desktop.png`
- `docs/qa/apple-ui/implementation-hero-mobile.png`
- `docs/qa/apple-ui/implementation-work-mobile.png`

viewport: desktop 1280 x 720; mobile 390 x 844

state: Chinese locale, hero at entry state, work gallery after reveal, about page at entry state

## Full-View Comparison Evidence

The before and after hero captures preserve the same content, geometry, concentric-circle composition, scroll stage, actions, and navigation structure. The after capture replaces the warm red field with a silver-white surface, changes the circle sequence to system blue values, and introduces a restrained light frosted navigation surface.

## Focused Region Comparison Evidence

- Work gallery: `implementation-work-desktop.png` and `implementation-work-mobile.png` verify the light gallery band, full-bleed project media, readable captions, consistent card rhythm, and zero horizontal overflow.
- About entry: `implementation-about-desktop.png` verifies the light information surface, original portrait color, readable hierarchy, and stable split composition.

## Findings

- No actionable P0, P1, or P2 findings remain.
- Typography uses an Apple-compatible system font stack with Inter and Segoe UI fallbacks. It does not claim to ship Apple's proprietary San Francisco font on unsupported systems.
- Colors use silver-white and cold neutral surfaces plus one system-blue accent. Black is reserved for text and media-viewer contrast rather than large page bands.
- Image quality and crops are unchanged from the approved project assets. Hover states no longer alter image saturation.
- Content, project order, labels, filters, routes, media, modal behavior, and embedded project links are unchanged.
- The existing GSAP and reveal animation source files match the saved backup hashes.

## Patches Made

- Added cold neutral and system-blue tokens.
- Removed the global grain overlay.
- Added a limited frosted-glass web treatment to persistent navigation and overlay controls with opaque fallbacks.
- Restyled work, manifesto, about, resume, skills, facts, contact, modal, and viewer surfaces.
- Replaced the remaining black hero, resume, facts, and contact bands with white, silver-grey, and pale-blue surfaces.

## 2026-08-27 contact and motion recovery

- Restored bidirectional `IntersectionObserver` state for all `.reveal` elements: enter, exit above the viewport, and re-enter on reverse scroll.
- Rebuilt the contact close so the ZAYN wordmark is a high-contrast top-line element, separate from the closing statement and email action.
- `pnpm build` passed. Browser screenshot verification was unavailable because the local preview URL is blocked by the in-app browser policy in this session.
- Replaced the career practice artwork with a code-native light editorial poster using the same blue-grey and system-blue palette as the refreshed site.
- Updated the Chinese and English contact phone values to `132 0831 2346` and `+86 132 0831 2346`.
- Kept the media viewer dark so video and embedded project previews retain strong visual focus.
- Added reduced-transparency handling without changing reduced-motion behavior.

## Verification

- Production build: passed.
- Project count: 11.
- Filters: 6 motion, 5 graphic, 11 all.
- Desktop horizontal overflow: 0.
- Mobile horizontal overflow: 0.
- Browser console warnings/errors: none.
- Project modal open and body lock: passed.

final result: passed
