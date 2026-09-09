(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-navigation]');
  const pageProgress = document.querySelector('[data-page-progress]');
  const scrubSection = document.querySelector('[data-scrub-section]');
  const explodedVideo = document.querySelector('#exploded-video');
  const explodedRange = document.querySelector('#exploded-range');
  const explodedProgress = document.querySelector('#exploded-progress');
  const contactForm = document.querySelector('[data-contact-form]');
  const formMessage = document.querySelector('[data-form-message]');
  const finishingCarousel = document.querySelector('[data-finishing-carousel]');
  const finishingSlides = Array.from(document.querySelectorAll('[data-finishing-slide]'));
  const finishingDots = Array.from(document.querySelectorAll('[data-finishing-dot]'));
  const finishingPrevious = document.querySelector('[data-finishing-previous]');
  const finishingNext = document.querySelector('[data-finishing-next]');

  let videoDuration = 0;
  let sliderActive = false;
  let scrollFrame = null;
  let requestedVideoTime = 0;
  let seekQueued = false;

  const clamp = (value, minimum, maximum) => {
    return Math.min(Math.max(value, minimum), maximum);
  };

  const updatePageState = () => {
    const scrollTop = window.scrollY;
    header?.classList.toggle('is-scrolled', scrollTop > 24);

    if (pageProgress) {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
      pageProgress.style.width = `${clamp(progress, 0, 1) * 100}%`;
    }
  };

  updatePageState();
  window.addEventListener('scroll', updatePageState, { passive: true });

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.classList.toggle('is-open', !isOpen);
    navigation?.classList.toggle('is-open', !isOpen);
    body.style.overflow = !isOpen ? 'hidden' : '';
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.classList.remove('is-open');
      navigation.classList.remove('is-open');
      body.style.overflow = '';
    });
  });

  const applyRequestedVideoTime = () => {
    seekQueued = false;

    if (!explodedVideo || videoDuration <= 0) {
      return;
    }

    const maximumTime = Math.max(videoDuration - 1 / 30, 0);
    const safeTime = clamp(requestedVideoTime, 0, maximumTime);

    if (Math.abs(explodedVideo.currentTime - safeTime) < 0.004) {
      return;
    }

    explodedVideo.currentTime = safeTime;
  };

  const queueVideoSeek = (time) => {
    requestedVideoTime = time;

    if (seekQueued) {
      return;
    }

    seekQueued = true;
    requestAnimationFrame(applyRequestedVideoTime);
  };

  const setVideoProgress = (progress, updateSlider = true) => {
    if (!explodedVideo || !Number.isFinite(videoDuration) || videoDuration <= 0) {
      return;
    }

    const safeProgress = clamp(progress, 0, 1);
    queueVideoSeek(safeProgress * videoDuration);

    if (updateSlider && explodedRange) {
      const maximum = Number(explodedRange.max) || 1000;
      explodedRange.value = String(Math.round(safeProgress * maximum));
    }

    if (explodedProgress) {
      const percent = `${Math.round(safeProgress * 100)}%`;
      explodedProgress.value = percent;
      explodedProgress.textContent = percent;
    }
  };

  const updateVideoFromScroll = () => {
    scrollFrame = null;

    if (!scrubSection || !explodedVideo || sliderActive || videoDuration <= 0) {
      return;
    }

    const sectionRect = scrubSection.getBoundingClientRect();
    const stickyTop = window.innerWidth <= 900 ? 78 : 92;
    const availableDistance = Math.max(sectionRect.height - window.innerHeight + stickyTop, 1);
    const rawProgress = (stickyTop - sectionRect.top) / availableDistance;

    /* Hold the assembled frame at the beginning and the fully exploded
       frame at the end to create scroll buffer around the active sequence. */
    const startBuffer = window.innerWidth <= 560 ? 0.16 : 0.18;
    const endBuffer = window.innerWidth <= 560 ? 0.16 : 0.18;
    const activeRange = Math.max(1 - startBuffer - endBuffer, 0.01);
    const progress = (rawProgress - startBuffer) / activeRange;

    setVideoProgress(progress, true);
  };

  const requestScrollUpdate = () => {
    if (scrollFrame !== null) {
      return;
    }

    scrollFrame = requestAnimationFrame(updateVideoFromScroll);
  };

  const initializeVideo = () => {
    if (!explodedVideo || !Number.isFinite(explodedVideo.duration)) {
      return;
    }

    videoDuration = explodedVideo.duration;
    explodedVideo.pause();
    explodedVideo.currentTime = 0;
    setVideoProgress(0, true);
    requestScrollUpdate();
  };

  if (explodedVideo) {
    explodedVideo.load();

    if (explodedVideo.readyState >= 1) {
      initializeVideo();
    } else {
      explodedVideo.addEventListener('loadedmetadata', initializeVideo, { once: true });
    }

    explodedVideo.addEventListener('seeked', () => {
      if (Math.abs(explodedVideo.currentTime - requestedVideoTime) > 0.025) {
        queueVideoSeek(requestedVideoTime);
      }
    });
  }

  if (explodedRange) {
    const setSliderActive = (active) => {
      sliderActive = active;
    };

    explodedRange.addEventListener('pointerdown', () => setSliderActive(true));
    explodedRange.addEventListener('pointerup', () => setSliderActive(false));
    explodedRange.addEventListener('pointercancel', () => setSliderActive(false));
    explodedRange.addEventListener('change', () => setSliderActive(false));

    explodedRange.addEventListener('input', (event) => {
      const maximum = Number(event.currentTarget.max) || 1000;
      const progress = Number(event.currentTarget.value) / maximum;
      setVideoProgress(progress, false);
    });
  }

  window.addEventListener('pointerup', () => {
    sliderActive = false;
  }, { passive: true });

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });


  let activeFinishingSlide = 0;
  let finishingTouchStartX = null;

  const showFinishingSlide = (index) => {
    if (!finishingSlides.length) {
      return;
    }

    activeFinishingSlide = (index + finishingSlides.length) % finishingSlides.length;

    finishingSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeFinishingSlide;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    finishingDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeFinishingSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  };

  finishingPrevious?.addEventListener('click', () => {
    showFinishingSlide(activeFinishingSlide - 1);
  });

  finishingNext?.addEventListener('click', () => {
    showFinishingSlide(activeFinishingSlide + 1);
  });

  finishingDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showFinishingSlide(Number(dot.dataset.finishingDot));
    });
  });

  finishingCarousel?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showFinishingSlide(activeFinishingSlide - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showFinishingSlide(activeFinishingSlide + 1);
    }
  });

  finishingCarousel?.addEventListener('touchstart', (event) => {
    finishingTouchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  finishingCarousel?.addEventListener('touchend', (event) => {
    if (finishingTouchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? finishingTouchStartX;
    const distance = touchEndX - finishingTouchStartX;
    finishingTouchStartX = null;

    if (Math.abs(distance) < 45) {
      return;
    }

    showFinishingSlide(distance > 0 ? activeFinishingSlide - 1 : activeFinishingSlide + 1);
  }, { passive: true });

  showFinishingSlide(0);

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (formMessage) {
      formMessage.hidden = false;
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
