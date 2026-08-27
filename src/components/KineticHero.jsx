import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function KineticHero({ lang, text }) {
  const root = useRef(null);
  const isZh = lang === 'zh';

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set('.kinetic-hero__message--final', { autoAlpha: 1, y: 0 });
      return undefined;
    }

    // Keep the timeline paused and let ScrollTrigger set its progress directly.
    // There is no independent clock, so the hero cannot continue moving after
    // the user stops scrolling and naturally reverses when they scroll upward.
    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: 'none' },
    });

    timeline
      .to('.kinetic-hero__letter--z', { xPercent: -34, yPercent: -10 }, 0.03)
      .to('.kinetic-hero__letter--a', { xPercent: -12, yPercent: 13 }, 0.03)
      .to('.kinetic-hero__letter--y', { xPercent: 12, yPercent: -13 }, 0.03)
      .to('.kinetic-hero__letter--n', { xPercent: 34, yPercent: 10 }, 0.03)
      .to('.kinetic-hero__intro', { autoAlpha: 0, y: -46 }, 0.06)
      .to('.kinetic-hero__circle--one', { scale: 5.8 }, 0.02)
      .to('.kinetic-hero__circle--two', { scale: 5.1 }, 0.13)
      .to('.kinetic-hero__circle--three', { scale: 4.2 }, 0.24)
      .to('.kinetic-hero__circle--four', { scale: 3.5 }, 0.34)
      .fromTo('.kinetic-hero__message--first', { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.2)
      .to('.kinetic-hero__message--first', { autoAlpha: 0, y: -56, duration: 0.12 }, 0.43)
      .fromTo('.kinetic-hero__message--final', { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.13 }, 0.52)
      .to('.kinetic-hero__letters', { autoAlpha: 0, scale: 1.08, duration: 0.12 }, 0.46)
      .to('.kinetic-hero__circles', { autoAlpha: 0.64, duration: 0.16 }, 0.62)
      .to('.kinetic-hero__stage', { scale: 0.9, borderRadius: 36, autoAlpha: 0.18, duration: 0.18 }, 0.82);

    const scrollTrigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate: (self) => timeline.progress(self.progress),
      onRefresh: (self) => timeline.progress(self.progress),
    });

    // Render the initial state immediately. This is deliberately progress 0,
    // even when the page has been sitting at the top for a while.
    timeline.progress(scrollTrigger.progress || 0);

    return () => {
      scrollTrigger.kill();
      timeline.kill();
    };
  }, { scope: root, dependencies: [lang] });

  return (
    <section className="kinetic-hero" id="top" ref={root}>
      <span className="nav-sentinel" aria-hidden="true" />
      <div className="kinetic-hero__stage">
        <div className="kinetic-hero__circles" aria-hidden="true">
          <i className="kinetic-hero__circle kinetic-hero__circle--one" />
          <i className="kinetic-hero__circle kinetic-hero__circle--two" />
          <i className="kinetic-hero__circle kinetic-hero__circle--three" />
          <i className="kinetic-hero__circle kinetic-hero__circle--four" />
        </div>

        <div className="kinetic-hero__intro">
          <p className="kinetic-hero__label">HUANG ZIYANG / {isZh ? '视觉设计师' : 'VISUAL DESIGNER'}</p>
          <h1 className="kinetic-hero__letters" aria-label="Zayn">
            <span className="kinetic-hero__letter--z">Z</span>
            <span className="kinetic-hero__letter--a">A</span>
            <span className="kinetic-hero__letter--y">Y</span>
            <span className="kinetic-hero__letter--n">N</span>
          </h1>
          <p className="kinetic-hero__statement">{text.hero.statement}</p>
          <div className="kinetic-hero__actions">
            <a className="action action--solid" href="#work">{isZh ? '查看作品' : 'VIEW WORK'} <span aria-hidden="true">↗</span></a>
            <a className="action action--ghost" href="#about">{isZh ? '个人资料' : 'PROFILE'}</a>
          </div>
        </div>

        <div className="kinetic-hero__message kinetic-hero__message--first">
          <p>{isZh ? '秩序建立识别。' : 'ORDER BUILDS RECOGNITION.'}</p>
          <strong>{isZh ? '意外创造记忆。' : 'SURPRISE MAKES IT STICK.'}</strong>
        </div>

        <div className="kinetic-hero__message kinetic-hero__message--final">
          <p>{isZh ? '品牌、平面与动态影像' : 'BRAND, GRAPHIC AND MOTION'}</p>
          <strong>{isZh ? '把概念变成可感知的视觉体验。' : 'IDEAS MADE VISIBLE, TACTILE AND CLEAR.'}</strong>
        </div>
      </div>
    </section>
  );
}
