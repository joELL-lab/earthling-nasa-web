/* ==========================================================================
   NASA Web Portal — Interactive Page Controllers (Home, Features, Projects, About, Contact)
   ========================================================================== */

(function () {
  'use strict';

  const escapeHtml = (s) => (window.NASAShell ? window.NASAShell.escapeHtml(s) : String(s || ''));

  /* --------------------------------------------------------------------------
     HOME PAGE: Hero Search, Bento Grid Modals, Events, More Stories, Tweets, Carousel
     -------------------------------------------------------------------------- */
  function initHomePage() {
    if (!document.getElementById('homeHeroSearch')) return;
    const data = window.NASAData;
    if (!data) return;

    // 1. Live Hero Pill Search Dropdown
    const searchInput = document.getElementById('heroSearchInput');
    const clearBtn = document.getElementById('heroSearchClear');
    const dropdown = document.getElementById('heroSearchDropdown');
    const index = data.getSearchIndex();

    function renderHeroSearch(q) {
      const term = q.trim().toLowerCase();
      if (!term) {
        dropdown.classList.remove('is-open');
        dropdown.innerHTML = '';
        if (clearBtn) clearBtn.classList.remove('is-visible');
        return;
      }
      if (clearBtn) clearBtn.classList.add('is-visible');

      const matches = index.filter((item) =>
        item.title.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term)
      ).slice(0, 6);

      if (!matches.length) {
        dropdown.innerHTML = `<div style="padding:12px 14px;color:var(--text-muted);font-size:0.86rem;">No matches for "${escapeHtml(q)}" — try Artemis, Webb, Mars, or Hubble.</div>`;
        dropdown.classList.add('is-open');
        return;
      }

      dropdown.innerHTML = matches.map((m, idx) => `
        <button type="button" class="hero-search__item" data-hero-idx="${idx}">
          <div>
            <div class="hero-search__item-title">${escapeHtml(m.title)}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(m.subtitle)}</div>
          </div>
          <span class="hero-search__item-meta">${escapeHtml(m.type)}</span>
        </button>
      `).join('');
      dropdown.classList.add('is-open');

      dropdown.querySelectorAll('.hero-search__item').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          const picked = matches[idx];
          dropdown.classList.remove('is-open');
          if (picked.action === 'url') {
            window.location.href = picked.href;
          } else if (picked.action === 'article') {
            window.NASAShell.openArticleModal(picked.payload);
          } else if (picked.action === 'mission') {
            window.NASAShell.openMissionModal(picked.payload);
          } else if (picked.action === 'iss') {
            window.NASAShell.openIssLiveModal();
          }
        });
      });
    }

    searchInput.addEventListener('input', (e) => renderHeroSearch(e.target.value));
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim()) renderHeroSearch(searchInput.value);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        renderHeroSearch('');
        searchInput.focus();
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#homeHeroSearch')) {
        dropdown.classList.remove('is-open');
      }
    });

    // 2. Bento Story Cards -> Article Reader Modal
    document.querySelectorAll('[data-article-id]').forEach((card) => {
      const openCard = () => {
        const id = card.getAttribute('data-article-id');
        const article = data.BENTO_ARTICLES[id] || data.MORE_STORIES.find((s) => s.id === id);
        if (article) window.NASAShell.openArticleModal(article);
      };
      card.addEventListener('click', openCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCard();
        }
      });
    });

    // 3. NASA Events Sidebar Items + Calendar / Launches Modal
    document.querySelectorAll('[data-event-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ev = data.NASA_EVENTS.find((item) => item.id === btn.getAttribute('data-event-id'));
        if (!ev) return;
        window.NASAShell.openModal({
          eyebrow: `NASA EVENT • ${ev.date}`,
          title: ev.title,
          html: `
            <div class="nasa-modal__prose">
              <p>${escapeHtml(ev.detail)}</p>
            </div>
            <div class="nasa-modal__tags">
              <span class="nasa-chip">${escapeHtml(ev.type)}</span>
              <span class="nasa-chip">Live NASA Broadcast</span>
            </div>
          `
        });
      });
    });

    document.querySelectorAll('[data-events-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const kind = btn.getAttribute('data-events-filter');
        const filtered = data.NASA_EVENTS.filter((e) =>
          kind === 'Launches' ? e.type.includes('Launch') : true
        );
        window.NASAShell.openModal({
          eyebrow: kind === 'Launches' ? 'LAUNCH MANIFEST' : 'NASA MISSION CALENDAR',
          title: kind === 'Launches' ? 'Upcoming Launches & Flight Tests' : 'Full NASA Events Schedule',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${filtered.map((ev) => `
                <div style="padding:14px 16px;border-radius:8px;background:rgba(20,24,34,0.85);border:1px solid var(--border-subtle);">
                  <div style="font-family:var(--font-mono);font-size:0.74rem;color:var(--glow-cyan);margin-bottom:4px;">${escapeHtml(ev.date)} • ${escapeHtml(ev.type)}</div>
                  <div style="font-weight:600;color:#fff;margin-bottom:4px;">${escapeHtml(ev.title)}</div>
                  <div style="font-size:0.86rem;color:var(--text-secondary);">${escapeHtml(ev.detail)}</div>
                </div>
              `).join('')}
            </div>
          `
        });
      });
    });

    // 4. More Stories Expandable Bar
    const moreGrid = document.getElementById('moreStoriesGrid');
    const moreBtn = document.getElementById('moreStoriesBtn');
    if (moreGrid && moreBtn) {
      moreGrid.innerHTML = data.MORE_STORIES.map((story) => `
        <article class="bento-card" tabindex="0" role="button" data-more-id="${escapeHtml(story.id)}">
          <img class="bento-card__img" src="${escapeHtml(story.image)}" alt="${escapeHtml(story.title)}" loading="lazy" />
          <div class="bento-card__scrim"></div>
          <div class="bento-card__content">
            <span class="bento-card__tag">${escapeHtml(story.category)}</span>
            <h3 class="bento-card__title">${escapeHtml(story.title)}</h3>
          </div>
        </article>
      `).join('');

      moreGrid.querySelectorAll('[data-more-id]').forEach((card) => {
        const openStory = () => {
          const item = data.MORE_STORIES.find((s) => s.id === card.getAttribute('data-more-id'));
          if (item) window.NASAShell.openArticleModal(item);
        };
        card.addEventListener('click', openStory);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openStory();
          }
        });
      });

      moreBtn.addEventListener('click', () => {
        const expanded = moreGrid.classList.toggle('is-expanded');
        moreBtn.setAttribute('aria-expanded', String(expanded));
        moreBtn.querySelector('span').textContent = expanded ? 'SHOW FEWER STORIES' : 'MORE STORIES';
      });
    }

    // 5. Tweets by @NASA Social Feed
    const tweetList = document.getElementById('nasaTweetList');
    const followBtn = document.getElementById('followNasaBtn');
    if (tweetList) {
      tweetList.innerHTML = data.TWEETS.map((tw) => `
        <article class="tweet-item">
          <div class="tweet-item__head">
            <span class="tweet-item__author">${escapeHtml(tw.handle)}</span>
            <span class="tweet-item__time">${escapeHtml(tw.time)}</span>
          </div>
          <p class="tweet-item__text">${escapeHtml(tw.text)}</p>
          ${tw.thumb ? `<img class="tweet-item__thumb" src="${escapeHtml(tw.thumb)}" alt="NASA update thumbnail" loading="lazy" />` : ''}
          <div class="tweet-item__actions">
            <button type="button" class="tweet-action-btn" data-like-btn>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span>${tw.likes.toLocaleString()}</span>
            </button>
            <span style="display:inline-flex;align-items:center;gap:4px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
              ${tw.reposts.toLocaleString()}
            </span>
          </div>
        </article>
      `).join('');

      tweetList.querySelectorAll('[data-like-btn]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const span = btn.querySelector('span');
          const count = parseInt(span.textContent.replace(/,/g, ''), 10) || 0;
          const liked = btn.classList.toggle('is-liked');
          span.textContent = (liked ? count + 1 : count - 1).toLocaleString();
        });
      });
    }

    if (followBtn) {
      followBtn.addEventListener('click', () => {
        const following = followBtn.classList.toggle('is-following');
        followBtn.textContent = following ? 'Following' : 'Follow';
        if (following) {
          window.NASAShell.showToast('Subscribed to @NASA', 'Live mission updates highlighted in your feed.');
        }
      });
    }

    // 6. Image of the Day Full View Trigger
    const iotdBtn = document.getElementById('iotdExpandBtn');
    if (iotdBtn) {
      iotdBtn.addEventListener('click', () => {
        window.NASAShell.openArticleModal({
          category: 'IMAGE OF THE DAY • ISS EXPEDITION 49',
          date: 'NASA Photo ID: ISS049-E-004708',
          title: 'Space Station Flight Over the Southern Tip of Italy',
          image: data.IMAGES.italyNight,
          tags: ['International Space Station', 'Earth at Night', 'Southern Italy'],
          body: [
            'Captured by astronauts aboard the International Space Station from an orbital altitude of 250 miles, this night photograph illuminates the southern Italian peninsula, Sicily, and the glowing coastal metropolis of Naples.',
            'Orbital night observations help atmospheric scientists study urban light distribution, maritime corridors across the Mediterranean Sea, and upper-atmospheric airglow.'
          ]
        });
      });
    }

    // 7. Our Missions Carousel
    const track = document.getElementById('missionsTrack');
    const prevBtn = document.getElementById('missionsPrevBtn');
    const nextBtn = document.getElementById('missionsNextBtn');
    if (track) {
      const featured = data.MISSIONS.slice(0, 6);
      track.innerHTML = featured.map((m) => `
        <article class="mission-slide-card" tabindex="0" role="button" data-mission-id="${escapeHtml(m.id)}">
          <img class="mission-slide-card__img" src="${escapeHtml(m.image)}" alt="${escapeHtml(m.fullName)}" loading="lazy" />
          <div class="mission-slide-card__scrim"></div>
          <div class="mission-slide-card__content">
            <div class="mission-slide-card__target">${escapeHtml(m.target)}</div>
            <h3 class="mission-slide-card__name">${escapeHtml(m.name)}</h3>
            <p class="mission-slide-card__desc">${escapeHtml(m.shortDesc)}</p>
          </div>
        </article>
      `).join('');

      let currentIndex = 0;

      function getVisibleCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4;
      }

      function updateCarousel() {
        const cards = track.querySelectorAll('.mission-slide-card');
        if (!cards.length) return;
        const visible = getVisibleCount();
        const maxIdx = Math.max(0, cards.length - visible);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIdx));
        const cardWidth = cards[0].getBoundingClientRect().width + 16;
        track.style.transform = `translate3d(-${(currentIndex * cardWidth).toFixed(1)}px, 0, 0)`;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const visible = getVisibleCount();
          const maxIdx = Math.max(0, featured.length - visible);
          currentIndex = currentIndex <= 0 ? maxIdx : currentIndex - 1;
          updateCarousel();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const visible = getVisibleCount();
          const maxIdx = Math.max(0, featured.length - visible);
          currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
          updateCarousel();
        });
      }

      track.querySelectorAll('.mission-slide-card').forEach((card) => {
        const openMission = () => {
          const mission = featured.find((m) => m.id === card.getAttribute('data-mission-id'));
          if (mission) window.NASAShell.openMissionModal(mission);
        };
        card.addEventListener('click', openMission);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openMission();
          }
        });
      });

      window.addEventListener('resize', updateCarousel);
      updateCarousel();
    }
  }

  /* --------------------------------------------------------------------------
     FEATURES PAGE: Category Filtering
     -------------------------------------------------------------------------- */
  function initFeaturesPage() {
    const grid = document.getElementById('featuresBentoGrid');
    const filterWrap = document.getElementById('featuresFilterPills');
    if (!grid || !filterWrap || !window.NASAData) return;

    const items = window.NASAData.FEATURES_TECH;

    function renderFeatures(category) {
      const filtered = category === 'All'
        ? items
        : items.filter((item) => item.category === category);

      grid.innerHTML = filtered.map((item, idx) => `
        <article class="feature-tech-card tilt-card filter-enter ${item.wide && category === 'All' ? 'is-wide' : ''}" style="animation-delay:${idx * 65}ms;">
          <div class="feature-tech-card__media">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
            <div class="feature-tech-card__scrim"></div>
            <span class="feature-tech-card__cat">${escapeHtml(item.category)}</span>
          </div>
          <div class="feature-tech-card__body">
            <h3 class="feature-tech-card__title">${escapeHtml(item.title)}</h3>
            <p class="feature-tech-card__desc">${escapeHtml(item.desc)}</p>
            <div class="feature-tech-card__specs">
              ${item.specs.map((s) => `<span class="spec-tag">${escapeHtml(s)}</span>`).join('')}
            </div>
          </div>
        </article>
      `).join('');

      if (window.NASAAnimations) {
        window.NASAAnimations.initTiltCards(grid);
      }
    }

    filterWrap.querySelectorAll('.filter-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        renderFeatures(pill.getAttribute('data-category'));
      });
    });

    renderFeatures('All');
  }

  /* --------------------------------------------------------------------------
     PROJECTS PAGE: Live Search + Status/Domain Pills + Mission Brief Modal
     -------------------------------------------------------------------------- */
  function initProjectsPage() {
    const grid = document.getElementById('projectsDirectoryGrid');
    const filterWrap = document.getElementById('projectsFilterPills');
    const searchInput = document.getElementById('projectsSearchInput');
    if (!grid || !filterWrap || !window.NASAData) return;

    // Include Artemis, JWST, Perseverance, Voyager, Europa Clipper, Hubble, Juno, Cassini (ordered cleanly)
    const orderedIds = ['artemis', 'jwst', 'perseverance', 'voyager', 'europa-clipper', 'hubble', 'juno', 'cassini'];
    const directory = orderedIds
      .map((id) => window.NASAData.MISSIONS.find((m) => m.id === id))
      .filter(Boolean);

    let activeFilter = 'All';
    let searchTerm = '';

    function getStatusBadge(status) {
      if (status === 'Active') {
        return `<span class="status-badge"><span class="status-beacon"></span>Active</span>`;
      }
      if (status === 'Upcoming') {
        return `<span class="status-badge status-badge--upcoming"><span class="status-dot"></span>Upcoming</span>`;
      }
      return `<span class="status-badge status-badge--historic"><span class="status-dot"></span>Historic</span>`;
    }

    function renderProjects() {
      const q = searchTerm.trim().toLowerCase();
      const filtered = directory.filter((m) => {
        const matchesFilter = activeFilter === 'All' || m.tags.includes(activeFilter) || m.status === activeFilter || m.domain === activeFilter;
        const matchesQuery = !q ||
          m.fullName.toLowerCase().includes(q) ||
          m.target.toLowerCase().includes(q) ||
          m.shortDesc.toLowerCase().includes(q) ||
          m.domain.toLowerCase().includes(q);
        return matchesFilter && matchesQuery;
      });

      if (!filtered.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:42px;text-align:center;background:var(--bg-card);border-radius:10px;border:1px solid var(--border-subtle);color:var(--text-secondary);">No missions matched your current filter or search query.</div>`;
        return;
      }

      grid.innerHTML = filtered.map((m, idx) => `
        <article class="project-card tilt-card filter-enter" style="animation-delay:${idx * 60}ms;">
          <div class="project-card__media">
            <img src="${escapeHtml(m.image)}" alt="${escapeHtml(m.fullName)}" loading="lazy" />
            <div class="project-card__scrim"></div>
            ${getStatusBadge(m.status)}
          </div>
          <div class="project-card__body">
            <div class="project-card__domain">${escapeHtml(m.domain)} • ${escapeHtml(m.target)}</div>
            <h3 class="project-card__title">${escapeHtml(m.fullName)}</h3>
            <p class="project-card__summary">${escapeHtml(m.shortDesc)}</p>
            <div class="project-card__meta">
              <span>Launch: ${escapeHtml(m.launchDate)}</span>
            </div>
            <button type="button" class="btn-nasa-primary btn-cosmic-sweep" data-brief-id="${escapeHtml(m.id)}">
              <span>View Mission Brief</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </article>
      `).join('');

      grid.querySelectorAll('[data-brief-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const m = directory.find((item) => item.id === btn.getAttribute('data-brief-id'));
          if (m) window.NASAShell.openMissionModal(m);
        });
      });

      if (window.NASAAnimations) {
        window.NASAAnimations.initTiltCards(grid);
      }
    }

    filterWrap.querySelectorAll('.filter-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        activeFilter = pill.getAttribute('data-filter');
        renderProjects();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderProjects();
      });
    }

    renderProjects();
  }

  /* --------------------------------------------------------------------------
     CONTACT US PAGE: Real-time Form Validation + Submission Toast + FAQ Accordion
     -------------------------------------------------------------------------- */
  function initContactPage() {
    const form = document.getElementById('nasaContactForm');
    const faqList = document.getElementById('nasaFaqList');

    if (faqList && window.NASAData) {
      faqList.innerHTML = window.NASAData.FAQS.map((faq, idx) => `
        <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
          <button type="button" class="faq-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span>${escapeHtml(faq.q)}</span>
            <svg class="faq-trigger__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-panel">
            <div class="faq-panel__inner">
              <div class="faq-panel__content">${escapeHtml(faq.a)}</div>
            </div>
          </div>
        </div>
      `).join('');

      faqList.querySelectorAll('.faq-trigger').forEach((btn) => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-item');
          const isOpen = item.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', String(isOpen));
        });
      });
    }

    if (form) {
      const fields = {
        fullName: {
          el: document.getElementById('contactFullName'),
          err: document.getElementById('errFullName'),
          validate: (v) => v.trim().length >= 2
        },
        email: {
          el: document.getElementById('contactEmail'),
          err: document.getElementById('errEmail'),
          validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        },
        inquiryType: {
          el: document.getElementById('contactInquiryType'),
          err: document.getElementById('errInquiryType'),
          validate: (v) => v.trim().length > 0
        },
        subject: {
          el: document.getElementById('contactSubject'),
          err: document.getElementById('errSubject'),
          validate: (v) => v.trim().length >= 3
        },
        message: {
          el: document.getElementById('contactMessage'),
          err: document.getElementById('errMessage'),
          validate: (v) => v.trim().length >= 10
        }
      };

      function checkField(key) {
        const f = fields[key];
        if (!f || !f.el) return true;
        const ok = f.validate(f.el.value);
        f.el.classList.toggle('is-invalid', !ok);
        if (f.err) f.err.classList.toggle('is-visible', !ok);
        return ok;
      }

      Object.keys(fields).forEach((key) => {
        const f = fields[key];
        if (f.el) {
          f.el.addEventListener('input', () => checkField(key));
          f.el.addEventListener('blur', () => checkField(key));
        }
      });

      const submitBtn = document.getElementById('contactSubmitBtn');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const allValid = Object.keys(fields).map(checkField).every(Boolean);
        if (!allValid) {
          window.NASAShell.showToast('Transmission Check', 'Please complete all highlighted fields before sending.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.querySelector('span').textContent = 'Transmitting to Mission Control...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Transmit Inquiry';
          }
          form.reset();
          Object.values(fields).forEach((f) => {
            if (f.el) f.el.classList.remove('is-invalid');
            if (f.err) f.err.classList.remove('is-visible');
          });
          window.NASAShell.showToast(
            'Inquiry Transmitted',
            'NASA Public Communications received your dispatch. Reference #HQ-2026-841.'
          );
        }, 550);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHomePage();
    initFeaturesPage();
    initProjectsPage();
    initContactPage();
  });
})();
