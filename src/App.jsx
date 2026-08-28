import React, { useEffect, useState } from 'react';
import { copy, projects } from './data.js';
import PackTracePage from './components/PackTracePage.jsx';
import KineticHero from './components/KineticHero.jsx';
import ProjectAccordion from './components/ProjectAccordion.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactFooter from './components/ContactFooter.jsx';
import ProjectPoster from './components/ProjectPoster.jsx';

function getPageFromHash() {
  if (window.location.hash === '#pack-trace') return 'pack-trace';
  return window.location.hash === '#about' ? 'about' : 'home';
}

function usePageReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReady(true);
      return undefined;
    }

    let cancelled = false;
    const minimumHold = new Promise((resolve) => window.setTimeout(resolve, 420));
    Promise.all([document.fonts.ready, minimumHold]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-ready', ready);
    return () => document.body.classList.remove('is-ready');
  }, [ready]);

  return ready;
}

function useReveal(dependencies) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const delays = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-exiting');
          return;
        }

        // A section leaving through the top receives a short exit transition.
        // Leaving below the viewport restores its entrance position for the
        // next downward pass.
        // On phones, keep content visible once it has entered. This avoids
        // hiding a long gallery while the user is moving through it quickly.
        if (isMobile) return;
        const hasPassedViewport = entry.boundingClientRect.top < 0;
        entry.target.classList.toggle('is-exiting', hasPassedViewport);
        entry.target.classList.remove('is-visible');
      });
    }, {
      threshold: isMobile ? 0.01 : 0.14,
      rootMargin: isMobile ? '24% 0px 24% 0px' : '-6% 0px -6% 0px',
    });

    elements.forEach((element) => {
      const parent = element.parentElement;
      const index = delays.get(parent) || 0;
      element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
      delays.set(parent, index + 1);
      // Restored deep links need their preceding content in its completed
      // visual state while keeping the current viewport ready to animate.
      if (element.getBoundingClientRect().bottom < 0) {
        element.classList.add('is-exiting');
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, dependencies);
}

function Loader({ ready }) {
  return (
    <div className={`loader${ready ? ' is-done' : ''}`} aria-hidden="true">
      <span>ZAYN</span>
      <i />
    </div>
  );
}

function Header({ lang, setLang, page, menuOpen, setMenuOpen, text }) {
  const [scrolled, setScrolled] = useState(page === 'about');

  useEffect(() => {
    if (page === 'about') {
      setScrolled(true);
      return undefined;
    }

    const sentinel = document.querySelector('.nav-sentinel');
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [page]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <a className="site-header__brand" href="#top" aria-label="Zayn home" onClick={closeMenu}>
          <strong>ZAYN</strong><span>VISUAL DESIGNER</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">{text.nav.work}</a>
          <a className={page === 'about' ? 'is-current' : ''} href="#about">{text.nav.about}</a>
          <a href="#contact">{text.nav.contact}</a>
        </nav>
        <div className="site-header__actions">
          <button className="language-toggle" type="button" aria-label="Switch language" onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
            {lang === 'zh' ? 'EN' : '中'}
          </button>
          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          ><span /><span /></button>
        </div>
      </header>
      <div className={`menu-panel${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <a href="#work" onClick={closeMenu}>{text.nav.work}</a>
          <a href="#about" onClick={closeMenu}>{text.nav.about}</a>
          <a href="#contact" onClick={closeMenu}>{text.nav.contact}</a>
        </nav>
        <p>HUANG ZIYANG / ZAYN</p>
      </div>
    </>
  );
}

function Manifesto({ text }) {
  return (
    <section className="manifesto-section">
      <p className="reveal"><span>{text.manifesto.first}</span><strong>{text.manifesto.second}</strong></p>
      <a className="reveal" href="#about">{text.manifesto.about} <span aria-hidden="true">↗</span></a>
    </section>
  );
}

function ProjectModal({ index, lang, text, close, next, openProject }) {
  const project = index === null ? projects[0] : projects[index];
  const open = index !== null;
  const externalProject = project.presentation === 'external';
  return (
    <div className={`project-modal${project.posterLogoClass ? ` project-modal--${project.posterLogoClass}` : ''}${project.video ? ' project-modal--video' : ''}${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open} inert={!open} aria-labelledby="modal-title">
      <button className="modal-close" type="button" aria-label="Close project" onClick={close}>×</button>
      <div className={`modal-visual${project.posterLogoClass ? ` modal-visual--${project.posterLogoClass}` : ''}`}>
        {project.video ? (
          <video src={project.video} poster={project.poster} controls playsInline preload="metadata" aria-label={project.title[lang]} />
        ) : project.posterComponent ? (
          <ProjectPoster className="ahomelas-poster--modal" />
        ) : (
          <img src={project.modalImage || project.image} alt={project.title[lang]} decoding="async" />
        )}
        {project.posterLogo && <span className="modal-poster-overlay" aria-hidden="true"><img src={project.posterLogo} alt="" decoding="async" /></span>}
      </div>
      <div className="modal-content">
        <p className="modal-kicker">{project.id} / {String(projects.length).padStart(2, '0')}</p>
        <h2 id="modal-title">{project.title[lang]}</h2>
        <p className="modal-meta">{project.type[lang]} / {project.year}</p>
        <div className="modal-copy">
          <div><span>{text.modal.intro}</span><p>{project.description[lang]}</p></div>
          <div><span>{text.modal.role}</span><p>{project.role[lang]}</p></div>
        </div>
        <div className="modal-actions">
          {project.link && (externalProject ? (
            <a className="action action--solid" href={project.link} target="_blank" rel="noreferrer">
              {lang === 'zh' ? '访问亚马逊店铺' : 'VISIT AMAZON STORE'} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button className="action action--solid" type="button" onClick={() => openProject(project)}>{text.modal.visit} <span aria-hidden="true">↗</span></button>
          ))}
          <button className="action action--ghost" type="button" onClick={next}>{text.modal.next} <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}

function ProjectViewer({ project, lang, close }) {
  if (!project) return null;
  return (
    <div className="project-viewer is-open" role="dialog" aria-modal="true" aria-label={`${project.title[lang]} project viewer`}>
      <div className="project-viewer__bar">
        <button type="button" onClick={close} aria-label="返回项目概览"><span aria-hidden="true">←</span><span>{project.title[lang]}</span></button>
        <a href={project.link} target="_blank" rel="noreferrer">{lang === 'zh' ? '新窗口打开' : 'OPEN IN NEW WINDOW'} <b aria-hidden="true">↗</b></a>
      </div>
      <iframe src={project.link} title={`${project.title[lang]} website`} allow="autoplay; fullscreen" />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('zayn-lang') || 'zh');
  const [page, setPage] = useState(getPageFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [embeddedProject, setEmbeddedProject] = useState(null);
  const ready = usePageReady();
  const text = copy[lang];

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const hashId = window.location.hash.replace('#', '') || 'top';
    const id = hashId === 'about' ? 'top' : hashId;
    const frame = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'auto' }));
    return () => window.cancelAnimationFrame(frame);
  }, [page, ready]);

  useEffect(() => {
    localStorage.setItem('zayn-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  useEffect(() => {
    const locked = menuOpen || activeProject !== null || embeddedProject !== null;
    document.body.classList.toggle('is-locked', locked);
    if (activeProject !== null && embeddedProject === null) document.querySelector('.modal-close')?.focus();
    return () => document.body.classList.remove('is-locked');
  }, [menuOpen, activeProject, embeddedProject]);

  useEffect(() => {
    const keydown = (event) => {
      if (event.key !== 'Escape') return;
      if (embeddedProject !== null) setEmbeddedProject(null);
      else setActiveProject(null);
      setMenuOpen(false);
    };
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, [embeddedProject]);

  useReveal([page, filter, lang, ready]);

  return (
    <>
      <Loader ready={ready} />
      {page !== 'pack-trace' && <Header lang={lang} setLang={setLang} page={page} menuOpen={menuOpen} setMenuOpen={setMenuOpen} text={text} />}
      {page === 'pack-trace' ? (
        <PackTracePage />
      ) : page === 'about' ? (
        <><AboutPage text={text} /><ContactFooter text={text} /></>
      ) : (
        <main>
          <KineticHero lang={lang} text={text} />
          <ProjectAccordion projects={projects} lang={lang} text={text} filter={filter} setFilter={setFilter} onOpen={setActiveProject} />
          <Manifesto text={text} />
          <ContactFooter text={text} />
        </main>
      )}
      <ProjectModal
        index={activeProject}
        lang={lang}
        text={text}
        close={() => setActiveProject(null)}
        openProject={setEmbeddedProject}
        next={() => setActiveProject((value) => (value + 1) % projects.length)}
      />
      <ProjectViewer project={embeddedProject} lang={lang} close={() => setEmbeddedProject(null)} />
    </>
  );
}
