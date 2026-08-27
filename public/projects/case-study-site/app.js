const tabs = [...document.querySelectorAll('[data-project-tab]')];
const projects = [...document.querySelectorAll('[data-project]')];
const jumpButtons = [...document.querySelectorAll('[data-jump]')];
const progressLabel = document.querySelector('[data-progress]');
const transitionLayer = document.querySelector('[data-transition-layer]');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const closeButton = document.querySelector('[data-lightbox-close]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('[data-hero]');

let activeProject = 'ahomelas';
let switching = false;
let lastTrigger = null;
let revealObserver;
let chapterObserver;
let heroExitFrame = 0;

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function animateHero() {
  const items = [...document.querySelectorAll('[data-hero-item]')];
  if (reduceMotion.matches) return;
  items.forEach((item, index) => {
    const isTitleLine = item.classList.contains('hero-title-line');
    const target = isTitleLine ? item.querySelector(':scope > span') : item;
    if (isTitleLine && target) {
      target.animate(
        [
          { opacity: 0, transform: 'translateY(112%)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 820, delay: 170 + index * 110, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' },
      );
      return;
    }
    item.animate(
      [
        { opacity: 0, transform: 'translateY(28px)' },
        { opacity: 1, transform: getComputedStyle(item).transform === 'none' ? 'translateY(0)' : getComputedStyle(item).transform },
      ],
      { duration: 650, delay: 90 + index * 70, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' },
    );
  });
}

function updateHeroExit() {
  if (!hero || reduceMotion.matches) return;
  cancelAnimationFrame(heroExitFrame);
  heroExitFrame = requestAnimationFrame(() => {
    const threshold = hero.offsetHeight * 0.18;
    hero.classList.toggle('is-leaving', window.scrollY > threshold);
  });
}

function initRevealObserver(scope = document) {
  const items = [...scope.querySelectorAll('[data-reveal]')].filter((item) => item.dataset.revealReady !== 'true');
  if (!items.length) return;
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -9% 0px' });
  }
  items.forEach((item) => {
    item.dataset.revealReady = 'true';
    revealObserver.observe(item);
  });
}

function initChapterObserver(scope = document) {
  if (chapterObserver) chapterObserver.disconnect();
  const chapters = [...scope.querySelectorAll('[data-chapter]')];
  if (!chapters.length || !('IntersectionObserver' in window)) return;
  chapterObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible && progressLabel) progressLabel.textContent = visible.target.dataset.chapter;
  }, { threshold: [0.15, 0.35, 0.6], rootMargin: '-18% 0px -55% 0px' });
  chapters.forEach((chapter) => chapterObserver.observe(chapter));
}

async function setProject(projectId) {
  if (switching) return;
  if (projectId === activeProject) {
    document.querySelector('.project-switcher').focus?.({ preventScroll: true });
    window.scrollTo({ top: document.querySelector('.project-switcher').offsetTop, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    return;
  }
  const current = document.querySelector(`[data-project="${activeProject}"]`);
  const next = document.querySelector(`[data-project="${projectId}"]`);
  if (!current || !next) return;
  switching = true;
  tabs.forEach((tab) => {
    const active = tab.dataset.projectTab === projectId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  if (!reduceMotion.matches) {
    current.classList.add('is-exiting');
    transitionLayer.querySelector('span').textContent = projectId === 'proya' ? 'PROJECT 02' : 'PROJECT 01';
    await delay(210);
    transitionLayer.classList.add('is-covering');
    await delay(400);
  }

  current.hidden = true;
  current.classList.remove('is-active', 'is-exiting');
  next.hidden = false;
  next.classList.add('is-active', 'is-entering');
  activeProject = projectId;
  const firstChapter = next.querySelector('[data-chapter]');
  if (progressLabel && firstChapter) progressLabel.textContent = firstChapter.dataset.chapter;
  window.scrollTo({ top: document.querySelector('.project-switcher').offsetTop, behavior: 'auto' });
  initRevealObserver(next);
  initChapterObserver(next);

  if (!reduceMotion.matches) {
    transitionLayer.classList.remove('is-covering');
    transitionLayer.classList.add('is-uncovering');
    await delay(490);
    transitionLayer.classList.remove('is-uncovering');
    next.classList.remove('is-entering');
  }
  next.focus({ preventScroll: true });
  switching = false;
}

function openLightbox(button) {
  const image = button.querySelector('img');
  if (!image) return;
  lastTrigger = button;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.dataset.caption || image.alt;
  if (typeof lightbox.showModal === 'function') lightbox.showModal();
  else lightbox.setAttribute('open', '');
  closeButton.focus();
}

function closeLightbox() {
  if (typeof lightbox.close === 'function' && lightbox.open) lightbox.close();
  else lightbox.removeAttribute('open');
  lastTrigger?.focus();
}

tabs.forEach((tab) => tab.addEventListener('click', () => setProject(tab.dataset.projectTab)));
jumpButtons.forEach((button) => button.addEventListener('click', () => {
  const projectId = button.dataset.jump;
  if (projectId !== activeProject) setProject(projectId);
  else window.scrollTo({ top: document.querySelector('.project-switcher').offsetTop, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
}));
document.querySelectorAll('[data-lightbox]').forEach((button) => button.addEventListener('click', () => openLightbox(button)));
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.open) closeLightbox(); });

animateHero();
updateHeroExit();
window.addEventListener('scroll', updateHeroExit, { passive: true });
initRevealObserver();
initChapterObserver(document.querySelector('[data-project].is-active'));

window.portfolioCaseStudy = { setProject, openLightbox, closeLightbox };
