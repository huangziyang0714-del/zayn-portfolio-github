const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');

const numberedColor = (code, name, tone, group) => ({
  code,
  name,
  tone,
  group,
  finish: 'sand',
  source: '01–28 编号色卡'
});

const referenceColor = (name, tone, group, finish = 'matte') => ({
  code: '',
  name,
  tone,
  group,
  finish,
  source: '扩展实物色卡'
});

const colorCatalog = [
  numberedColor('01', '象牙白', '#F3F0E6', 'light'),
  numberedColor('02', '米白色', '#E8E2D4', 'light'),
  numberedColor('03', '雅灰色', '#D8D4CD', 'grey'),
  numberedColor('04', '象牙灰', '#D2CEC6', 'grey'),
  numberedColor('05', '浅灰色', '#C7C5C0', 'grey'),
  numberedColor('06', '帕斯高灰', '#BBBAB5', 'grey'),
  numberedColor('07', '慕斯灰', '#AEA9A2', 'grey'),
  numberedColor('08', '经典灰', '#999894', 'grey'),
  numberedColor('09', '希腊灰', '#B3AEA6', 'grey'),
  numberedColor('10', '卡门灰', '#A7A5A1', 'grey'),
  numberedColor('11', '太空灰', '#929391', 'grey'),
  numberedColor('12', '微水泥', '#858783', 'grey'),
  numberedColor('13', '哲思灰', '#8D9491', 'grey'),
  numberedColor('14', '北欧灰', '#E2DFD3', 'light'),
  numberedColor('15', '路易斯灰', '#D3D0CA', 'grey'),
  numberedColor('16', '烟雾灰', '#CAC7C1', 'grey'),
  numberedColor('17', '卡其灰', '#C9BDB1', 'warm'),
  numberedColor('18', '印度灰', '#E4DFCF', 'light'),
  numberedColor('19', '浅沙色', '#EADDC5', 'warm'),
  numberedColor('20', '雅致灰', '#D7CBC3', 'grey'),
  numberedColor('21', '沙滩灰', '#DCCBAD', 'warm'),
  numberedColor('22', '奶茶黄', '#D8BF9A', 'warm'),
  numberedColor('23', '意大利黄', '#D9BC82', 'warm'),
  numberedColor('24', '原木色', '#C89A72', 'warm'),
  numberedColor('25', '漫青木', '#C5A16C', 'warm'),
  numberedColor('26', '漫奶咖', '#B78E65', 'warm'),
  numberedColor('27', '咖啡棕', '#795943', 'warm'),
  numberedColor('28', '经典黑', '#201D1D', 'dark'),
  referenceColor('紫烟灰', '#D6C9BE', 'grey'),
  referenceColor('砂陶灰', '#CFC3B8', 'grey'),
  referenceColor('云雾灰', '#C4BBB3', 'grey'),
  referenceColor('浅霞灰', '#D9D1C8', 'grey'),
  referenceColor('素灰色', '#C4BCB3', 'grey'),
  referenceColor('淡奶咖', '#D2B894', 'warm'),
  referenceColor('法国木纹', '#C2A07B', 'warm'),
  referenceColor('木纹灰', '#A88667', 'warm'),
  referenceColor('咖啡色', '#896549', 'warm'),
  referenceColor('极光银', '#B9B7BB', 'metal', 'glitter'),
  referenceColor('银灰色', '#A9A8AA', 'metal', 'metal'),
  referenceColor('古堡灰', '#716A67', 'dark'),
  referenceColor('金属灰', '#575354', 'metal', 'metal'),
  referenceColor('雅典黑', '#252224', 'dark', 'gloss'),
  referenceColor('浅米白', '#F1E9D9', 'light'),
  referenceColor('奶油浅黄', '#F4E1B6', 'light'),
  referenceColor('素浅黄', '#E8DECA', 'light'),
  referenceColor('洛可奶灰', '#DDD7CE', 'light'),
  referenceColor('香草黄', '#EBD9AE', 'warm'),
  referenceColor('慕浅杏', '#E7D1B5', 'warm'),
  referenceColor('原木沙', '#CEB699', 'warm'),
  referenceColor('杏子灰', '#DED3C1', 'warm'),
  referenceColor('碧云灰', '#C7BFBA', 'grey'),
  referenceColor('漫青灰', '#D1CBCA', 'grey'),
  referenceColor('素浅灰', '#D2C9C1', 'grey'),
  referenceColor('玛丽灰', '#C4BDB8', 'grey'),
  referenceColor('琉璃灰', '#B9AEA6', 'grey'),
  referenceColor('名雅灰', '#AAA29D', 'grey'),
  referenceColor('荷兰灰', '#CFC8C2', 'grey'),
  referenceColor('罗马灰', '#BDB5AF', 'grey'),
  referenceColor('古希腊灰', '#AAA29D', 'grey'),
  referenceColor('浅亮金', '#E6CE9E', 'metal', 'metal'),
  referenceColor('香槟金', '#D9B77F', 'metal', 'metal'),
  referenceColor('闪亮金', '#E2AA20', 'metal', 'glitter'),
  referenceColor('贵族金', '#B78312', 'metal', 'glitter'),
  referenceColor('亚浅灰', '#CDCBC5', 'grey'),
  referenceColor('亚中灰', '#A6A39E', 'grey'),
  referenceColor('太空银', '#909095', 'metal', 'glitter'),
  referenceColor('贵族银', '#A8A5A7', 'metal', 'metal'),
  referenceColor('星空灰', '#5D585B', 'metal', 'metal'),
  referenceColor('钢琴黑', '#151515', 'dark', 'gloss'),
  referenceColor('亮白', '#F7F4EF', 'light'),
  referenceColor('雅雪白', '#EEE9E0', 'light'),
  referenceColor('烟雨灰', '#DED9D2', 'grey'),
  referenceColor('淡雅灰', '#D4D0C9', 'grey'),
  referenceColor('银河灰', '#C1BEB7', 'grey'),
  referenceColor('洛可奶白', '#EEE6D6', 'light'),
  referenceColor('天涯灰', '#D4CEC4', 'grey'),
  referenceColor('明月灰', '#C9C1BC', 'grey'),
  referenceColor('斯奇灰', '#D1CCC6', 'grey'),
  referenceColor('晨露灰', '#DDD6CE', 'grey'),
  referenceColor('现代灰', '#BDB8B2', 'grey'),
  referenceColor('月影灰', '#B1ABA5', 'grey')
];

const swatchGrid = document.querySelector('[data-swatches]');
if (swatchGrid) {
  const swatchFragment = document.createDocumentFragment();

  colorCatalog.forEach((color) => {
    const button = document.createElement('button');
    button.className = 'swatch';
    button.type = 'button';
    button.dataset.group = color.group;
    button.dataset.name = color.name;
    button.dataset.code = color.code;
    button.dataset.source = color.source;
    button.dataset.finish = color.finish;
    button.style.setProperty('--swatch', color.tone);
    button.setAttribute('aria-label', color.code ? `${color.name}，编号 ${color.code}` : color.name);

    const sample = document.createElement('i');
    sample.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.append(document.createTextNode(color.name));
    if (color.code) {
      const code = document.createElement('small');
      code.textContent = color.code;
      label.append(code);
    }

    button.append(sample, label);
    swatchFragment.append(button);
  });

  swatchGrid.append(swatchFragment);
}

const filters = document.querySelectorAll('[data-filter]');
const swatches = document.querySelectorAll('.swatch');
const toast = document.querySelector('[data-toast]');
const heroSection = document.querySelector('#cover');
const heroStage = document.querySelector('[data-hero-video]');
const heroProgress = document.querySelector('[data-video-progress]');

if (heroSection && heroStage) {
  const video = heroStage.querySelector('.hero-media');
  let hasEntered = false;
  let replayArmed = false;
  let scrollFrame = 0;

  const updateProgress = () => {
    const ratio = video.duration ? video.currentTime / video.duration : 0;
    heroProgress.style.transform = `scaleX(${Math.min(ratio, 1)})`;
  };

  video.addEventListener('timeupdate', updateProgress);
  const playEntrance = async () => {
    replayArmed = false;
    heroSection.classList.remove('is-video-complete');
    video.currentTime = 0;
    heroProgress.style.transform = 'scaleX(0)';
    await video.play().catch(() => {});
  };

  video.addEventListener('ended', () => {
    heroSection.classList.add('is-video-complete');
    heroProgress.style.transform = 'scaleX(1)';
  });

  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio >= 0.58 && (!hasEntered || replayArmed)) {
      hasEntered = true;
      playEntrance();
    } else if (entry.intersectionRatio <= 0.12 && hasEntered) {
      replayArmed = true;
      video.pause();
    }
  }, { threshold: [0, 0.12, 0.58, 1] });

  const updateHeroScroll = () => {
    scrollFrame = 0;
    const bounds = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(-bounds.top / Math.max(bounds.height, window.innerHeight), 0), 1);
    const baseScale = window.innerWidth <= 820 ? 1.02 : 1.012;

    heroSection.style.setProperty('--hero-media-scale', (baseScale + progress * 0.055).toFixed(3));
    heroSection.style.setProperty('--hero-media-y', `${(progress * 32).toFixed(1)}px`);
    heroSection.style.setProperty('--hero-content-y', `${(progress * -68).toFixed(1)}px`);
    heroSection.style.setProperty('--hero-content-opacity', (1 - progress * 0.72).toFixed(3));
    heroSection.style.setProperty('--hero-frost-blur', `${(5 + progress * 7).toFixed(1)}px`);
    heroSection.style.setProperty('--hero-grid-y', `${(progress * -24).toFixed(1)}px`);
  };

  const requestHeroScrollUpdate = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeroScroll);
  };

  video.src = heroStage.dataset.source;
  video.load();
  heroObserver.observe(heroSection);
  updateHeroScroll();
  window.addEventListener('scroll', requestHeroScrollUpdate, { passive: true });
  window.addEventListener('resize', requestHeroScrollUpdate, { passive: true });
}

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '打开导航');
    document.body.style.overflow = '';
  });
});

let filterAnimationTimer;
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.filter;
    let visibleCount = 0;
    const enteringSwatches = [];
    swatches.forEach((swatch) => {
      swatch.hidden = filter !== 'all' && swatch.dataset.group !== filter;
      if (!swatch.hidden) {
        swatch.style.setProperty('--filter-delay', `${Math.min(visibleCount, 12) * 18}ms`);
        enteringSwatches.push(swatch);
        visibleCount += 1;
      }
    });
    document.querySelector('[data-visible-count]').textContent = String(visibleCount);

    if (!reducePageMotion && swatchGrid && enteringSwatches.length) {
      swatchGrid.classList.remove('is-filtering');
      void swatchGrid.offsetWidth;
      swatchGrid.classList.add('is-filtering');
      window.clearTimeout(filterAnimationTimer);
      filterAnimationTimer = window.setTimeout(() => swatchGrid.classList.remove('is-filtering'), 760);
    }
  });
});

let toastTimer;
swatches.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    const reference = swatch.dataset.code
      ? `${swatch.dataset.source} · ${swatch.dataset.code}`
      : swatch.dataset.source;
    toast.textContent = `${swatch.dataset.name} · ${reference} · 以实物色卡为准`;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  });
});

const reducePageMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionSections = Array.from(document.querySelectorAll('.page-section'));

const revealPlans = {
  cover: [
    ['.hero-content > .eyebrow', 'left', 30],
    ['.hero-content > h1', 'headline', 100],
    ['.hero-subtitle', 'up', 230],
    ['.hero-actions', 'scale', 320],
    ['.hero-signature', 'right', 440],
    ['.scroll-cue', 'scale', 520]
  ],
  manifesto: [
    ['.split-intro > div:first-child > .eyebrow', 'left', 20],
    ['.split-intro > div:first-child > h2', 'headline', 90],
    ['.manifesto-copy > p', 'right', 170],
    ['.keyword-row span', 'card', 260, 75],
    ['.seam-line', 'wipe', 390]
  ],
  brand: [
    ['.section-inner > .eyebrow', 'left', 20],
    ['.brand-layout > h2', 'headline', 90],
    ['.brand-layout > p', 'right', 180],
    ['.fact-grid article', 'card', 260, 75]
  ],
  technology: [
    ['.section-heading .eyebrow', 'left', 20],
    ['.section-heading h2', 'headline', 90],
    ['.section-heading > p', 'right', 170],
    ['.performance-card', 'card', 250, 95]
  ],
  yellowing: [
    ['.test-copy > .eyebrow', 'left', 20],
    ['.test-copy > h2', 'headline', 90],
    ['.test-copy > p:not(.eyebrow)', 'up', 180],
    ['.test-meta', 'scale', 250],
    ['.sample-stage', 'media', 170]
  ],
  environment: [
    ['.product-display-panel', 'media', 30],
    ['.product-showcase-copy > .eyebrow', 'left', 90],
    ['.product-showcase-copy > h2', 'headline', 150],
    ['.product-showcase-copy > p:not(.eyebrow)', 'right', 240],
    ['.product-spec-grid span', 'card', 310, 70]
  ],
  stain: [
    ['.section-heading .eyebrow', 'left', 20],
    ['.section-heading h2', 'headline', 90],
    ['.section-heading > p', 'right', 170],
    ['.product-display-panel', 'media', 230],
    ['.product-line', 'right', 290, 75]
  ],
  research: [
    ['.research-copy > .eyebrow', 'left', 20],
    ['.research-copy > h2', 'headline', 90],
    ['.research-copy > p:not(.eyebrow)', 'up', 190],
    ['.process-list > div', 'right', 170, 75]
  ],
  spaces: [
    ['.section-heading .eyebrow', 'left', 20],
    ['.section-heading h2', 'headline', 90],
    ['.section-heading > p', 'right', 170],
    ['.space', 'media', 250, 80]
  ],
  colors: [
    ['.section-heading .eyebrow', 'left', 20],
    ['.section-heading h2', 'headline', 90],
    ['.section-heading > p', 'right', 170],
    ['.color-toolbar', 'up', 240],
    ['.swatch-grid', 'media', 310],
    ['.color-note', 'up', 390]
  ],
  partners: [
    ['.partner-intro .eyebrow', 'left', 20],
    ['.partner-intro h2', 'headline', 90],
    ['.partner-intro > p', 'right', 180],
    ['.support-grid article', 'card', 250, 90]
  ],
  contact: [
    ['.contact-layout > div:first-child > .footer-logo', 'media', 20],
    ['.contact-layout > div:first-child > .eyebrow', 'left', 100],
    ['.contact-layout > div:first-child > h2', 'headline', 170],
    ['.contact-actions > *', 'right', 210, 85],
    ['footer', 'up', 420]
  ]
};

const addRevealItems = (section, selector, type, baseDelay = 0, step = 0) => {
  section.querySelectorAll(selector).forEach((element, index) => {
    if (element.dataset.reveal) return;
    element.dataset.reveal = type;
    element.style.setProperty('--reveal-delay', `${baseDelay + index * step}ms`);
  });
};

motionSections.forEach((section) => {
  section.dataset.motionSection = '';
  (revealPlans[section.id] || []).forEach((plan) => addRevealItems(section, ...plan));
  const pageNumber = section.querySelector('.page-number');
  if (pageNumber) addRevealItems(section, '.page-number', 'up', 360);
});

if (reducePageMotion || !('IntersectionObserver' in window)) {
  motionSections.forEach((section) => section.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const past = entry.boundingClientRect.top < 0;
      const visible = entry.isIntersecting;
      section.classList.toggle('is-past', past && !visible);
      section.classList.toggle('is-visible', visible);
    });
  }, { threshold: [0, 0.08, 0.28], rootMargin: '-5% 0px -5% 0px' });

  // Let the initial hidden state paint before revealing the first viewport.
  // This also makes direct hash navigation use the same entrance sequence.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      motionSections.forEach((section) => revealObserver.observe(section));
    });
  });
}

const canUsePointerMotion = !reducePageMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canUsePointerMotion) {
  let activePointerElement = null;

  document.addEventListener('pointermove', (event) => {
    const eventTarget = event.target instanceof Element ? event.target : null;
    const nextPointerElement = eventTarget?.closest('[data-pointer-reactive]') || null;
    if (activePointerElement && activePointerElement !== nextPointerElement) {
      activePointerElement.classList.remove('is-pointer-active');
    }
    if (nextPointerElement) nextPointerElement.classList.add('is-pointer-active');
    activePointerElement = nextPointerElement;
  }, { passive: true });

  if (heroSection) {
    let heroPointerFrame = 0;
    let pendingHeroPointer = null;

    const renderHeroPointer = () => {
      heroPointerFrame = 0;
      if (!pendingHeroPointer) return;
      const bounds = heroSection.getBoundingClientRect();
      const x = Math.min(Math.max((pendingHeroPointer.x - bounds.left) / bounds.width, 0), 1) - 0.5;
      const y = Math.min(Math.max((pendingHeroPointer.y - bounds.top) / bounds.height, 0), 1) - 0.5;
      heroSection.style.setProperty('--hero-pointer-media-x', `${(x * -14).toFixed(2)}px`);
      heroSection.style.setProperty('--hero-pointer-media-y', `${(y * -10).toFixed(2)}px`);
      heroSection.style.setProperty('--hero-pointer-content-x', `${(x * 8).toFixed(2)}px`);
      heroSection.style.setProperty('--hero-pointer-content-y', `${(y * 6).toFixed(2)}px`);
      heroSection.style.setProperty('--hero-pointer-grid-x', `${(x * 18).toFixed(2)}px`);
    };

    heroSection.addEventListener('pointermove', (event) => {
      pendingHeroPointer = { x: event.clientX, y: event.clientY };
      if (!heroPointerFrame) heroPointerFrame = window.requestAnimationFrame(renderHeroPointer);
    });

    heroSection.addEventListener('pointerleave', () => {
      pendingHeroPointer = null;
      if (heroPointerFrame) window.cancelAnimationFrame(heroPointerFrame);
      heroPointerFrame = 0;
      heroSection.style.setProperty('--hero-pointer-media-x', '0px');
      heroSection.style.setProperty('--hero-pointer-media-y', '0px');
      heroSection.style.setProperty('--hero-pointer-content-x', '0px');
      heroSection.style.setProperty('--hero-pointer-content-y', '0px');
      heroSection.style.setProperty('--hero-pointer-grid-x', '0px');
    });
  }

  document.querySelectorAll('.performance-card, .space, .fact-grid article, .support-grid article').forEach((element) => {
    let pointerFrame = 0;
    let pendingPointer = null;
    element.dataset.pointerReactive = '';

    element.addEventListener('pointerenter', () => element.classList.add('is-pointer-active'));

    const renderPointer = () => {
      pointerFrame = 0;
      if (!pendingPointer) return;
      const bounds = element.getBoundingClientRect();
      const x = Math.min(Math.max((pendingPointer.x - bounds.left) / bounds.width, 0), 1);
      const y = Math.min(Math.max((pendingPointer.y - bounds.top) / bounds.height, 0), 1);
      element.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
      element.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
      element.style.setProperty('--pointer-shift-x', `${((0.5 - x) * 10).toFixed(2)}px`);
      element.style.setProperty('--pointer-shift-y', `${((0.5 - y) * 8).toFixed(2)}px`);
    };

    element.addEventListener('pointermove', (event) => {
      element.classList.add('is-pointer-active');
      pendingPointer = { x: event.clientX, y: event.clientY };
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
    });

    element.addEventListener('pointerleave', () => {
      pendingPointer = null;
      element.classList.remove('is-pointer-active');
      if (activePointerElement === element) activePointerElement = null;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      element.style.setProperty('--pointer-x', '50%');
      element.style.setProperty('--pointer-y', '50%');
      element.style.setProperty('--pointer-shift-x', '0px');
      element.style.setProperty('--pointer-shift-y', '0px');
    });
  });
}
