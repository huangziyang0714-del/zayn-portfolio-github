import React, { useEffect, useRef, useState } from 'react';

const zones = [
  { id: 'hero', index: '01', top: 0, height: 12, label: 'TRAIL SYSTEM / 01', title: 'BUILT FOR THE TRAIL.', product: false },
  { id: 'manifesto', index: '02', top: 12, height: 15, label: 'MANIFESTO / 00', title: 'MOVE FURTHER. STAY CONNECTED.', product: false },
  { id: 'harness', index: '03', top: 27, height: 20, label: 'PT-H01 / CONTROL', title: 'MODULAR TRAIL HARNESS', product: true },
  { id: 'leash', index: '04', top: 47, height: 23, label: 'PT-L01 / CONNECTION', title: 'MODULAR TRAIL LEASH', product: true },
  { id: 'hydration', index: '05', top: 70, height: 20, label: 'PT-W01 / RECOVERY', title: 'FOLD-FLAT HYDRATION SYSTEM', product: true },
  { id: 'closing', index: '06', top: 90, height: 10, label: 'CLOSING / 06', title: 'THE TRAIL CHANGES. THE BOND HOLDS.', product: false },
];

// Each fragment reuses the supplied artwork as a cropped, independently
// animated layer. Coordinates are percentages of the original 1280 x 7291 PNG.
const fragments = [
  { id: 'hero-mark', zone: 'hero', left: 3.5, top: 1.4, width: 22, height: 4.2, label: 'TRACE MARK', kind: 'brand', depth: 1.1 },
  { id: 'hero-title', zone: 'hero', left: 3.2, top: 4.6, width: 40, height: 7.2, label: 'TRAIL TITLE', kind: 'type', depth: 1.35 },
  { id: 'hero-portrait', zone: 'hero', left: 28, top: 0, width: 69, height: 12, label: 'FIELD PORTRAIT', kind: 'image', depth: 1.05 },
  { id: 'hero-line', zone: 'hero', left: 3.3, top: 7.35, width: 42, height: 2.4, label: 'BOND LINE', kind: 'type', depth: 1.15 },
  { id: 'manifesto-title', zone: 'manifesto', left: 22, top: 14.1, width: 48, height: 10.5, label: 'MANIFESTO', kind: 'type', depth: 1.3 },
  { id: 'manifesto-copy', zone: 'manifesto', left: 67, top: 15.2, width: 28, height: 7.8, label: 'PURPOSE BUILT', kind: 'copy', depth: 1.1 },
  { id: 'manifesto-rule', zone: 'manifesto', left: 22, top: 24.2, width: 71, height: 1.5, label: 'SYSTEM RULE', kind: 'rule', depth: 1.2 },
  { id: 'harness-title', zone: 'harness', left: 3.7, top: 28.4, width: 39, height: 5.8, label: 'H01 / HARNESS', kind: 'type', depth: 1.25 },
  { id: 'harness-copy', zone: 'harness', left: 66, top: 29.6, width: 29, height: 5.2, label: 'CONTROL NOTES', kind: 'copy', depth: 1.05 },
  { id: 'harness-dog', zone: 'harness', left: 5, top: 35.2, width: 48, height: 10.9, label: 'FIELD FIT', kind: 'image', depth: 1.3 },
  { id: 'harness-product', zone: 'harness', left: 58.5, top: 35.2, width: 34.5, height: 10.9, label: 'PRODUCT DETAIL', kind: 'product', depth: 1.5 },
  { id: 'leash-title', zone: 'leash', left: 3.7, top: 49.1, width: 39, height: 5.8, label: 'L01 / LEASH', kind: 'type', depth: 1.25 },
  { id: 'leash-copy', zone: 'leash', left: 66, top: 50.4, width: 29, height: 5.2, label: 'CONNECTION NOTES', kind: 'copy', depth: 1.05 },
  { id: 'leash-photo', zone: 'leash', left: 5, top: 56, width: 48, height: 12.5, label: 'TRAIL ROUTE', kind: 'image', depth: 1.3 },
  { id: 'leash-product', zone: 'leash', left: 58.5, top: 56, width: 34.5, height: 12.5, label: 'PRODUCT DETAIL', kind: 'product', depth: 1.5 },
  { id: 'hydration-title', zone: 'hydration', left: 3.7, top: 71.6, width: 50, height: 5.6, label: 'W01 / HYDRATION', kind: 'type', depth: 1.25 },
  { id: 'hydration-copy', zone: 'hydration', left: 66, top: 72.7, width: 29, height: 5.3, label: 'RECOVERY NOTES', kind: 'copy', depth: 1.05 },
  { id: 'hydration-photo', zone: 'hydration', left: 5, top: 78.7, width: 48, height: 7.4, label: 'FIELD POUR', kind: 'image', depth: 1.3 },
  { id: 'hydration-product', zone: 'hydration', left: 58.5, top: 78.7, width: 34.5, height: 7.4, label: 'PRODUCT DETAIL', kind: 'product', depth: 1.5 },
  { id: 'hydration-detail', zone: 'hydration', left: 5, top: 87.1, width: 48, height: 2.4, label: 'QUICK STOP', kind: 'image', depth: 1.25 },
  { id: 'hydration-mark', zone: 'hydration', left: 58.5, top: 87.1, width: 34.5, height: 2.4, label: 'TRACE SYSTEM', kind: 'brand', depth: 1.35 },
  { id: 'closing-mark', zone: 'closing', left: 4, top: 92.3, width: 12, height: 4.7, label: 'TRACE MARK', kind: 'brand', depth: 1.2 },
  { id: 'closing-title', zone: 'closing', left: 3.7, top: 96, width: 88, height: 3.3, label: 'CLOSING STATEMENT', kind: 'type', depth: 1.3 },
];

export default function PackTracePage() {
  const pageRef = useRef(null);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    const sections = [...page.querySelectorAll('[data-trace-zone]')];
    const elementLayers = [...page.querySelectorAll('[data-trace-element]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      sections.forEach((section) => section.classList.add('is-visible'));
      elementLayers.forEach((element) => element.classList.add('is-zone-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
      const visibleZones = new Set(
        sections.filter((section) => section.classList.contains('is-visible')).map((section) => section.dataset.traceZone),
      );
      elementLayers.forEach((element) => {
        element.classList.toggle('is-zone-visible', visibleZones.has(element.dataset.traceParent));
      });
      const visibleSection = sections.find((section) => section.classList.contains('is-visible'));
      if (visibleSection) setActive(visibleSection.dataset.traceZone);
    }, { threshold: 0.08, rootMargin: '-12% 0px -12% 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const elementLayers = [...page.querySelectorAll('[data-trace-element]')];
    const move = (event) => {
      const rect = page.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      page.style.setProperty('--trace-x', `${(x * 14).toFixed(2)}px`);
      page.style.setProperty('--trace-y', `${(y * 10).toFixed(2)}px`);
      page.style.setProperty('--trace-light-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      page.style.setProperty('--trace-light-y', `${((y + 0.5) * 100).toFixed(1)}%`);

      // Nearby layers gently repel the pointer, so the composition feels
      // assembled from separate pieces instead of one flat image.
      elementLayers.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        if (elementRect.bottom < -80 || elementRect.top > window.innerHeight + 80) return;
        const centerX = elementRect.left + elementRect.width / 2;
        const centerY = elementRect.top + elementRect.height / 2;
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
        const radius = Math.max(150, Math.min(340, Math.max(elementRect.width, elementRect.height) * 1.1));
        const influence = Math.max(0, 1 - distance / radius);
        const shiftX = ((centerX - event.clientX) / Math.max(elementRect.width, 1)) * 14 * influence;
        const shiftY = ((centerY - event.clientY) / Math.max(elementRect.height, 1)) * 10 * influence;
        element.style.setProperty('--element-shift-x', `${shiftX.toFixed(2)}px`);
        element.style.setProperty('--element-shift-y', `${shiftY.toFixed(2)}px`);
        element.style.setProperty('--element-influence', influence.toFixed(3));
        element.classList.toggle('is-near', influence > 0.08);
      });
    };
    const leave = () => {
      page.style.setProperty('--trace-x', '0px');
      page.style.setProperty('--trace-y', '0px');
      page.style.setProperty('--trace-light-x', '50%');
      page.style.setProperty('--trace-light-y', '50%');
      elementLayers.forEach((element) => {
        element.style.setProperty('--element-shift-x', '0px');
        element.style.setProperty('--element-shift-y', '0px');
        element.style.setProperty('--element-influence', '0');
        element.classList.remove('is-near');
      });
    };
    page.addEventListener('pointermove', move);
    page.addEventListener('pointerleave', leave);
    return () => {
      page.removeEventListener('pointermove', move);
      page.removeEventListener('pointerleave', leave);
    };
  }, []);

  const scrollToZone = (id) => document.querySelector(`[data-trace-zone="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <main className="pack-trace-page" id="pack-trace" ref={pageRef}>
      <div className="pack-trace-topbar">
        <a className="pack-trace-brand" href="#top" aria-label="Back to Zayn home">PACK TRACE <span>/ ZAYN</span></a>
        <span>FIELD BROCHURE / 2026</span>
        <a href="#work">BACK TO WORK</a>
      </div>

      <nav className="pack-trace-rail" aria-label="Pack Trace sections">
        {zones.map((zone) => (
          <button key={zone.id} className={active === zone.id ? 'is-active' : ''} type="button" onClick={() => scrollToZone(zone.id)}>
            <span>{zone.index}</span>{zone.label}
          </button>
        ))}
      </nav>

      <div className="pack-trace-stage">
        <img className="pack-trace-image" src="/assets/pack-trace-reference.png" alt="Pack Trace outdoor pet equipment brand brochure" fetchPriority="high" decoding="async" />
        <div className="pack-trace-grain" aria-hidden="true" />
        <div className="pack-trace-light" aria-hidden="true" />
        <div className="pack-trace-elements" aria-label="Interactive artwork elements">
          {fragments.map((fragment) => (
            <button
              className={`pack-trace-fragment pack-trace-fragment--${fragment.kind}`}
              data-trace-element={fragment.id}
              data-trace-parent={fragment.zone}
              key={fragment.id}
              type="button"
              aria-label={fragment.label}
              style={{
                left: `${fragment.left}%`,
                top: `${fragment.top}%`,
                width: `${fragment.width}%`,
                height: `${fragment.height}%`,
                '--fragment-scale': `${100 / fragment.width}%`,
                '--fragment-offset-x': `${-(fragment.left / fragment.width) * 100}%`,
                '--fragment-offset-y': `${-(fragment.top / fragment.height) * 100}%`,
                '--fragment-depth': fragment.depth,
                zIndex: Math.round(fragment.depth * 10),
              }}
            >
              <img src="/assets/pack-trace-reference.png" alt="" aria-hidden="true" draggable="false" loading="lazy" decoding="async" />
              <span className="pack-trace-fragment__label">{fragment.label}</span>
              <span className="pack-trace-fragment__cursor" aria-hidden="true">+</span>
            </button>
          ))}
        </div>
        {zones.map((zone) => (
          <section
            className={`pack-trace-zone${zone.product ? ' is-product' : ''}`}
            data-trace-zone={zone.id}
            key={zone.id}
            style={{ top: `${zone.top}%`, height: `${zone.height}%` }}
            tabIndex="-1"
            aria-hidden="true"
            aria-label={`${zone.index} ${zone.title}`}
          />
        ))}
      </div>

      <div className="pack-trace-footer">
        <span>PACK TRACE / TECHNICAL OUTDOOR PET EQUIPMENT</span>
        <span>MOVE FURTHER. STAY CONNECTED.</span>
        <a href="#top">TOP ↑</a>
      </div>
    </main>
  );
}
