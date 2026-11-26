/* ==========================================================================
   NASA Web Portal — GPU-Accelerated Animations, Starfield, Embers, Parallax
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. Scroll Progress Bar & Dynamic Sticky Glass Navbar
     -------------------------------------------------------------------------- */
  function initScrollUI() {
    const progressBar = document.getElementById('orbitalScrollProgress');
    const navbar = document.getElementById('nasaNavbar');
    const earthImg = document.getElementById('heroEarthImg');
    let ticking = false;

    function updateOnScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      if (navbar) {
        if (scrollY > 36) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
      }

      if (earthImg && !prefersReducedMotion && scrollY < 900) {
        const offset = Math.min(60, scrollY * 0.14);
        earthImg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.03)`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }, { passive: true });

    updateOnScroll();
  }

  /* --------------------------------------------------------------------------
     2. Sliding Active-Link Underline in Navbar
     -------------------------------------------------------------------------- */
  function initNavUnderline() {
    const navList = document.querySelector('.nasa-nav__list');
    const underline = document.getElementById('navUnderline');
    if (!navList || !underline) return;

    const links = Array.from(navList.querySelectorAll('.nasa-nav__link'));
    const activeLink = navList.querySelector('.nasa-nav__link.is-active') || links[0];

    function positionUnderline(target) {
      if (!target) {
        underline.style.opacity = '0';
        return;
      }
      const listRect = navList.getBoundingClientRect();
      const linkRect = target.getBoundingClientRect();
      const left = linkRect.left - listRect.left;
      underline.style.width = `${linkRect.width}px`;
      underline.style.transform = `translate3d(${left}px, 0, 0)`;
      underline.style.opacity = '1';
    }

    if (activeLink) {
      requestAnimationFrame(() => positionUnderline(activeLink));
    }

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => positionUnderline(link));
      link.addEventListener('focus', () => positionUnderline(link));
    });

    navList.addEventListener('mouseleave', () => positionUnderline(activeLink));
    window.addEventListener('resize', () => positionUnderline(activeLink));
  }

  /* --------------------------------------------------------------------------
     3. Ambient Multi-Depth Twinkling Starfield Canvas with Mouse Parallax
     -------------------------------------------------------------------------- */
  function initStarfield() {
    const canvas = document.getElementById('cosmicStarfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let stars = [];
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId = null;

    function createStars() {
      const count = Math.min(220, Math.floor((width * height) / 7200));
      stars = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.45 + depth * 1.35,
          depth,
          baseAlpha: 0.22 + depth * 0.68,
          twinkleSpeed: 0.008 + Math.random() * 0.022,
          phase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.08 * (0.4 + depth),
          driftY: -0.02 - depth * 0.05,
          tint: depth > 0.8 ? '#93C5FD' : (depth < 0.25 ? '#CBD5E1' : '#FFFFFF')
        });
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.globalAlpha = s.baseAlpha;
        ctx.fillStyle = s.tint;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function renderFrame() {
      currentX += (pointerX - currentX) * 0.04;
      currentY += (pointerY - currentY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.phase += s.twinkleSpeed;
        s.x += s.driftX;
        s.y += s.driftY;

        if (s.x < -4) s.x = width + 4;
        if (s.x > width + 4) s.x = -4;
        if (s.y < -4) s.y = height + 4;
        if (s.y > height + 4) s.y = -4;

        const px = s.x + currentX * (10 + s.depth * 22);
        const py = s.y + currentY * (10 + s.depth * 22);
        const alpha = Math.max(0.1, Math.min(1, s.baseAlpha + Math.sin(s.phase) * 0.28));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.tint;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = window.requestAnimationFrame(renderFrame);
    }

    window.addEventListener('mousemove', function (e) {
      if (prefersReducedMotion) return;
      pointerX = (e.clientX / Math.max(1, width) - 0.5) * 2;
      pointerY = (e.clientY / Math.max(1, height) - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('resize', function () {
      resize();
      if (prefersReducedMotion) drawStatic();
    });

    resize();
    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animId = window.requestAnimationFrame(renderFrame);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        } else if (!document.hidden && !animId) {
          animId = window.requestAnimationFrame(renderFrame);
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. Footer Rising Warm Ember Particles Over Launch Exhaust
     -------------------------------------------------------------------------- */
  function initFooterEmbers() {
    const canvas = document.getElementById('footerEmbersCanvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let embers = [];
    let active = false;
    let animId = null;

    function spawnEmber(fromBottom) {
      const spread = width * 0.55;
      return {
        x: width * 0.5 + (Math.random() - 0.5) * spread,
        y: fromBottom ? height - Math.random() * 40 : Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(0.45 + Math.random() * 1.15),
        r: 0.9 + Math.random() * 2.1,
        life: 0.4 + Math.random() * 0.6,
        decay: 0.002 + Math.random() * 0.0035,
        color: Math.random() > 0.35 ? '#F59E0B' : '#FDE68A'
      };
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 410;
      canvas.width = width;
      canvas.height = height;
      embers = Array.from({ length: 42 }, () => spawnEmber(false));
    }

    function tick() {
      if (!active) {
        animId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];
        p.x += p.vx + Math.sin(p.y * 0.03) * 0.18;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0 || p.y < -10) {
          embers[i] = spawnEmber(true);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.life * 0.82);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#F59E0B';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animId = window.requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        active = entry.isIntersecting;
        if (active && !animId) {
          animId = window.requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.05 });

    resize();
    window.addEventListener('resize', resize);
    observer.observe(canvas.parentElement);
  }

  /* --------------------------------------------------------------------------
     5. Intersection Observer Scroll-Reveal Choreography
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
          }
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -36px 0px'
    });

    items.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     6. Lightweight 3D Tilt Hover Effect for Cards
     -------------------------------------------------------------------------- */
  function initTiltCards(root) {
    if (prefersReducedMotion) return;
    const scope = root || document;
    const cards = scope.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 5.5).toFixed(2);
        const rotateY = (x * 5.5).toFixed(2);
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Animated Telemetry Counters & Bars
     -------------------------------------------------------------------------- */
  function initTelemetryCounters() {
    const counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseFloat(el.getAttribute('data-count-to'));
      const suffix = el.getAttribute('data-count-suffix') || '';
      const bar = el.closest('.telemetry-metric')?.querySelector('.telemetry-bar-fill');
      const barPct = bar ? bar.getAttribute('data-bar-pct') : null;

      if (bar && barPct) {
        requestAnimationFrame(() => {
          bar.style.width = `${barPct}%`;
        });
      }

      if (prefersReducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const elapsed = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const current = Math.round(target * eased);
        el.textContent = `${current.toLocaleString()}${suffix}`;
        if (elapsed < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target.toLocaleString()}${suffix}`;
        }
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     8. Scroll-Animated Vertical Timeline (About Us)
     -------------------------------------------------------------------------- */
  function initTimelineDraw() {
    const timeline = document.getElementById('nasaTimeline');
    const progress = document.getElementById('nasaTimelineProgress');
    if (!timeline || !progress) return;

    const items = Array.from(timeline.querySelectorAll('.timeline-item'));

    function updateTimeline() {
      const rect = timeline.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.62;
      const total = Math.max(1, rect.height - 40);
      const passed = Math.max(0, Math.min(total, viewportMid - rect.top));
      const pct = (passed / total) * 100;
      progress.style.height = `${pct.toFixed(1)}%`;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < viewportMid + 40) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline);
    updateTimeline();
  }

  window.NASAAnimations = {
    initTiltCards,
    initScrollReveals
  };

  document.addEventListener('DOMContentLoaded', () => {
    initScrollUI();
    initNavUnderline();
    initStarfield();
    initFooterEmbers();
    initScrollReveals();
    initTiltCards(document);
    initTelemetryCounters();
    initTimelineDraw();
  });
})();
