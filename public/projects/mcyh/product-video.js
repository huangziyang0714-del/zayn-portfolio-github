const productVideos = Array.from(document.querySelectorAll('[data-product-video]'));
const reduceProductMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const wrapVideoTime = (time, duration) => {
  if (!duration) return 0;
  return ((time % duration) + duration) % duration;
};

productVideos.forEach((stage) => {
  const video = stage.querySelector('video');
  const panel = stage.closest('.product-display-panel');
  const status = panel.querySelector('[data-video-status]');
  const frameRate = 60;
  const dragWidthPerTurn = 1.45;
  const rotationDirection = stage.dataset.variant === 'blue' ? -1 : 1;
  let active = false;
  let manualControl = false;
  let dragging = false;
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartTime = 0;
  let pendingPointer = null;
  let pendingSeek = null;
  let pointerFrame = 0;
  let wheelDelta = 0;
  let wheelFrame = 0;
  let introCycle = 0;
  let introRequest = 0;
  let introRunning = false;

  video.muted = true;
  video.playsInline = true;
  stage.dataset.videoState = 'loading';
  stage.dataset.controlMode = 'loading';

  const setRotationProgress = (time = video.currentTime) => {
    if (!video.duration) return;
    const atEnd = time >= video.duration - 0.012;
    const progress = atEnd ? 1 : wrapVideoTime(time, video.duration) / video.duration;
    stage.style.setProperty('--rotation-progress', `${(progress * 100).toFixed(2)}%`);
    stage.dataset.rotationProgress = progress.toFixed(4);
  };

  const quantizeVideoTime = (time) => {
    if (!video.duration) return 0;
    return wrapVideoTime(Math.round(time * frameRate) / frameRate, video.duration);
  };

  const commitLatestSeek = () => {
    if (pendingSeek === null || !video.duration) return;
    const nextTime = pendingSeek;
    pendingSeek = null;
    if (Math.abs(video.currentTime - nextTime) < 0.001) return;
    video.currentTime = nextTime;
  };

  const queueSeek = (time) => {
    const nextTime = quantizeVideoTime(time);
    pendingSeek = nextTime;
    stage.dataset.scrubTime = nextTime.toFixed(3);
    setRotationProgress(nextTime);
  };

  const setManualControl = (interaction) => {
    manualControl = true;
    introRequest += 1;
    introRunning = false;
    video.pause();
    stage.classList.add('is-manual');
    stage.dataset.controlMode = 'manual';
    stage.dataset.videoState = dragging ? 'dragging' : 'interactive';
    status.textContent = '360° VIEW';
    if (interaction) stage.dataset.lastInteraction = interaction;
  };

  const startIntro = () => {
    if (!active || manualControl || dragging || introRunning || reduceProductMotion || !stage.classList.contains('is-ready')) return;
    introRunning = true;
    const request = ++introRequest;
    introCycle += 1;
    video.currentTime = 0;
    setRotationProgress(0);
    stage.classList.remove('is-manual');
    stage.dataset.controlMode = 'intro';
    stage.dataset.videoState = 'intro';
    stage.dataset.introCycle = String(introCycle);
    video.play()
      .then(() => {
        if (request !== introRequest || manualControl || !active) {
          introRunning = false;
          video.pause();
        }
      })
      .catch(() => {
        if (request === introRequest && !manualControl) setManualControl();
      });
  };

  const resetPointerEffect = () => {
    stage.style.setProperty('--video-x', '0px');
    stage.style.setProperty('--video-y', '0px');
    stage.style.setProperty('--video-rx', '0deg');
    stage.style.setProperty('--video-ry', '0deg');
    stage.style.setProperty('--video-light', '50%');
    stage.classList.remove('is-hovering');
  };

  const updatePointerEffect = ({ clientX, clientY }) => {
    const bounds = stage.getBoundingClientRect();
    const x = clamp((clientX - bounds.left) / bounds.width, 0, 1);
    const y = clamp((clientY - bounds.top) / bounds.height, 0, 1);
    stage.style.setProperty('--video-x', `${((x - 0.5) * -8).toFixed(2)}px`);
    stage.style.setProperty('--video-y', `${((y - 0.5) * -6).toFixed(2)}px`);
    stage.style.setProperty('--video-rx', `${((0.5 - y) * 1.8).toFixed(2)}deg`);
    stage.style.setProperty('--video-ry', `${((x - 0.5) * 2.8).toFixed(2)}deg`);
    stage.style.setProperty('--video-light', `${(30 + x * 40).toFixed(1)}%`);
  };

  const applyPendingPointerFrame = () => {
    if (pendingPointer) updatePointerEffect(pendingPointer);
    commitLatestSeek();
    pendingPointer = null;
  };

  const schedulePointerFrame = () => {
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      applyPendingPointerFrame();
    });
  };

  const flushPointerFrame = () => {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    applyPendingPointerFrame();
  };

  video.addEventListener('loadedmetadata', () => {
    stage.dataset.videoState = 'metadata';
    stage.dataset.duration = video.duration.toFixed(3);
    stage.dataset.videoWidth = String(video.videoWidth);
    stage.dataset.videoHeight = String(video.videoHeight);
    stage.dataset.frameRate = String(frameRate);
    stage.dataset.rotationDirection = String(rotationDirection);
    stage.dataset.dragWidthPerTurn = String(dragWidthPerTurn);
    video.currentTime = 0;
    setRotationProgress(0);
  });

  video.addEventListener('loadeddata', () => {
    stage.classList.add('is-ready');
    stage.dataset.videoState = 'ready';
    stage.dataset.controlMode = reduceProductMotion ? 'manual' : 'ready';
    status.textContent = '360° VIEW';
    if (reduceProductMotion) {
      manualControl = true;
      stage.classList.add('is-manual');
      video.pause();
    } else {
      startIntro();
    }
  });

  video.addEventListener('timeupdate', () => setRotationProgress());

  video.addEventListener('play', () => {
    if (manualControl || !active) video.pause();
  });

  video.addEventListener('ended', () => {
    introRequest += 1;
    introRunning = false;
    manualControl = true;
    stage.classList.add('is-manual');
    stage.dataset.controlMode = 'manual';
    stage.dataset.videoState = 'interactive';
    setRotationProgress(video.duration);
  });

  video.addEventListener('error', () => {
    stage.dataset.videoState = 'error';
    stage.dataset.controlMode = 'unavailable';
    status.textContent = 'VIDEO UNAVAILABLE';
  });

  stage.addEventListener('pointerenter', () => {
    stage.classList.add('is-hovering');
  });

  stage.addEventListener('pointerleave', () => {
    pendingPointer = null;
    if (!dragging) resetPointerEffect();
  });

  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || activePointerId !== null || !video.duration || video.readyState < 2) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    activePointerId = event.pointerId;
    dragging = true;
    dragStartX = event.clientX;
    dragStartTime = video.ended || video.currentTime >= video.duration - 1 / frameRate ? 0 : video.currentTime;
    setManualControl('drag');
    stage.classList.add('is-dragging');
    stage.dataset.videoState = 'dragging';
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointermove', (event) => {
    if (!event.isPrimary) return;
    stage.classList.add('is-hovering');
    pendingPointer = { clientX: event.clientX, clientY: event.clientY };
    if (!dragging || activePointerId !== event.pointerId || !video.duration) {
      schedulePointerFrame();
      return;
    }

    const distance = event.clientX - dragStartX;
    queueSeek(
      dragStartTime + rotationDirection * (distance / (stage.clientWidth * dragWidthPerTurn)) * video.duration
    );
    schedulePointerFrame();
  });

  document.addEventListener('pointermove', (event) => {
    const eventTarget = event.target instanceof Node ? event.target : null;
    if (!eventTarget || stage.contains(eventTarget) || dragging || !stage.classList.contains('is-hovering')) return;
    resetPointerEffect();
  }, { passive: true });

  const releasePointer = (event, releaseCapture = true) => {
    if (!dragging || activePointerId !== event.pointerId) return;
    flushPointerFrame();
    dragging = false;
    activePointerId = null;
    stage.classList.remove('is-dragging');
    stage.dataset.videoState = 'interactive';
    if (releaseCapture && stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  };

  stage.addEventListener('pointerup', releasePointer);
  stage.addEventListener('pointercancel', (event) => releasePointer(event));
  stage.addEventListener('lostpointercapture', (event) => releasePointer(event, false));

  stage.addEventListener('wheel', (event) => {
    if (!video.duration) return;
    setManualControl('wheel');
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1;
    wheelDelta += (event.deltaY || event.deltaX) * unit;
    if (wheelFrame) return;
    wheelFrame = requestAnimationFrame(() => {
      wheelFrame = 0;
      const amount = clamp(wheelDelta / 120, -1.5, 1.5);
      wheelDelta = 0;
      const nextTime = video.currentTime + rotationDirection * amount * video.duration * 0.03;
      queueSeek(nextTime);
      commitLatestSeek();
      stage.dataset.videoState = 'interactive';
    });
  }, { passive: true });

  stage.addEventListener('keydown', (event) => {
    if (!video.duration || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    setManualControl('keyboard');
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    queueSeek(video.currentTime + rotationDirection * direction * video.duration * 0.035);
    commitLatestSeek();
  });

  const observer = new IntersectionObserver(([entry]) => {
    const wasActive = active;
    active = entry.isIntersecting && entry.intersectionRatio >= 0.12;
    stage.dataset.inView = String(active);

    if (active && !wasActive) {
      manualControl = reduceProductMotion;
      introRunning = false;
      video.pause();
      video.currentTime = 0;
      setRotationProgress(0);
      if (reduceProductMotion) {
        stage.classList.add('is-manual');
        stage.dataset.controlMode = 'manual';
        stage.dataset.videoState = 'interactive';
      } else {
        startIntro();
      }
    } else if (!active && wasActive) {
      introRequest += 1;
      introRunning = false;
      video.pause();
      stage.dataset.videoState = 'paused';
    }
  }, { threshold: [0, 0.12] });

  observer.observe(stage);
  video.load();
});
