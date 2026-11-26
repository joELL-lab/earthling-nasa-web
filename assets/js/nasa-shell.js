/* ==========================================================================
   NASA Web Portal — Global Shell: Modals, Quick Search, Mobile Menu, Toasts
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showToast(title, desc) {
    let container = document.getElementById('nasaToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'nasaToastContainer';
      container.className = 'nasa-toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'nasa-toast';
    toast.innerHTML = `
      <div class="status-beacon" style="margin-top:6px;flex-shrink:0;"></div>
      <div>
        <div class="nasa-toast__title">${escapeHtml(title)}</div>
        ${desc ? `<div class="nasa-toast__desc">${escapeHtml(desc)}</div>` : ''}
      </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate3d(20px, 0, 0)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3600);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* --------------------------------------------------------------------------
     Ensure Shared Modal Markup Exists in DOM
     -------------------------------------------------------------------------- */
  function ensureModalRoot() {
    if (document.getElementById('nasaGlobalModal')) return;

    const modalHtml = `
      <div class="nasa-modal" id="nasaGlobalModal" role="dialog" aria-modal="true" aria-labelledby="nasaModalTitle" hidden>
        <div class="nasa-modal__backdrop" data-modal-close></div>
        <div class="nasa-modal__dialog">
          <div class="nasa-modal__header">
            <div>
              <div class="nasa-modal__eyebrow" id="nasaModalEyebrow">NASA BRIEFING</div>
              <h2 class="nasa-modal__title" id="nasaModalTitle">Loading...</h2>
            </div>
            <button type="button" class="nasa-modal__close" aria-label="Close modal" data-modal-close>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="nasa-modal__body" id="nasaModalBody"></div>
        </div>
      </div>

      <div class="nasa-modal" id="nasaSearchModal" role="dialog" aria-modal="true" aria-labelledby="nasaSearchModalTitle" hidden>
        <div class="nasa-modal__backdrop" data-search-close></div>
        <div class="nasa-modal__dialog" style="max-width: 640px;">
          <div class="nasa-modal__header">
            <div>
              <div class="nasa-modal__eyebrow">PORTAL INDEX</div>
              <h2 class="nasa-modal__title" id="nasaSearchModalTitle">Search NASA Portal</h2>
            </div>
            <button type="button" class="nasa-modal__close" aria-label="Close search" data-search-close>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="nasa-modal__body">
            <div class="quick-search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--glow-cyan);flex-shrink:0"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="search" id="globalQuickSearchInput" placeholder="Search missions, rovers, telescopes, stories, centers..." autocomplete="off" />
            </div>
            <div class="quick-search-results" id="globalQuickSearchResults"></div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  let lastFocusedEl = null;

  function openModal({ eyebrow, title, html }) {
    ensureModalRoot();
    const modal = document.getElementById('nasaGlobalModal');
    const eyebrowEl = document.getElementById('nasaModalEyebrow');
    const titleEl = document.getElementById('nasaModalTitle');
    const bodyEl = document.getElementById('nasaModalBody');

    lastFocusedEl = document.activeElement;
    eyebrowEl.textContent = eyebrow || 'NASA BRIEFING';
    titleEl.textContent = title || '';
    bodyEl.innerHTML = html || '';

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.nasa-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById('nasaGlobalModal');
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.hidden = true;
      const bodyEl = document.getElementById('nasaModalBody');
      if (bodyEl) bodyEl.innerHTML = '';
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    }, 260);
  }

  /* --------------------------------------------------------------------------
     Specific Modal Views: ISS Live, Article Reader, Mission Brief
     -------------------------------------------------------------------------- */
  function openIssLiveModal() {
    openModal({
      eyebrow: 'LIVE DOWNLINK • EXPEDITION 74',
      title: 'International Space Station — High Definition Earth Viewing',
      html: `
        <div class="nasa-modal__video-wrap">
          <iframe
            src="https://www.youtube.com/embed/P9C25Un7xaM?autoplay=1&rel=0&modestbranding=1"
            title="NASA Live International Space Station Earth View"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        <div class="nasa-modal__telemetry-grid">
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Orbital Altitude</div>
            <div class="telemetry-stat__value">408 km (254 mi)</div>
          </div>
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Velocity</div>
            <div class="telemetry-stat__value">27,600 km/h</div>
          </div>
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Inclination</div>
            <div class="telemetry-stat__value">51.64°</div>
          </div>
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Orbits / Day</div>
            <div class="telemetry-stat__value">15.5 Sunrises</div>
          </div>
        </div>
        <div class="nasa-modal__prose">
          <p>Orbiting Earth every 90 minutes, the International Space Station serves as humanity's premier microgravity laboratory—testing life support systems for Artemis lunar missions while monitoring Earth's atmosphere, storms, and climate in real time.</p>
          <p style="font-size:0.82rem;color:var(--text-muted);">Note: If the live stream is offline during orbital loss-of-signal, NASA automatically switches to recorded high-definition ISS Earth views.</p>
        </div>
      `
    });
  }

  function openArticleModal(article) {
    if (!article) return;
    const isVideo = Boolean(article.videoEmbed);
    const mediaHtml = isVideo
      ? `<div class="nasa-modal__video-wrap">
           <iframe src="${escapeHtml(article.videoEmbed)}" title="${escapeHtml(article.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div>`
      : (article.image ? `<img class="nasa-modal__hero-img" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" />` : '');

    const paragraphs = (article.body || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
    const tags = (article.tags || []).map((t) => `<span class="nasa-chip">${escapeHtml(t)}</span>`).join('');

    openModal({
      eyebrow: `${article.category || 'NASA FEATURE'} • ${article.date || ''}`,
      title: article.title,
      html: `
        ${mediaHtml}
        <div class="nasa-modal__prose">${paragraphs}</div>
        ${tags ? `<div class="nasa-modal__tags">${tags}</div>` : ''}
      `
    });
  }

  function openMissionModal(mission) {
    if (!mission) return;
    const objectives = (mission.objectives || []).map((o) => `<li>• ${escapeHtml(o)}</li>`).join('');
    const instruments = (mission.instruments || []).map((i) => `<span class="nasa-chip">${escapeHtml(i)}</span>`).join('');
    const milestones = (mission.milestones || []).map((m) => `
      <div style="padding:10px 12px;border-left:2px solid var(--glow-cyan);background:rgba(20,24,34,0.65);border-radius:0 6px 6px 0;">
        <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--glow-cyan);">${escapeHtml(m.date)}</div>
        <div style="font-size:0.88rem;color:#fff;">${escapeHtml(m.event)}</div>
      </div>
    `).join('');

    openModal({
      eyebrow: `MISSION BRIEF • ${mission.domain || 'EXPLORATION'}`,
      title: mission.name,
      html: `
        ${mission.image ? `<img class="nasa-modal__hero-img" src="${escapeHtml(mission.image)}" alt="${escapeHtml(mission.name)}" />` : ''}
        <div class="nasa-modal__telemetry-grid">
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Status</div>
            <div class="telemetry-stat__value">${escapeHtml(mission.status)}</div>
          </div>
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Launch Date</div>
            <div class="telemetry-stat__value">${escapeHtml(mission.launchDate)}</div>
          </div>
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Target</div>
            <div class="telemetry-stat__value">${escapeHtml(mission.target)}</div>
          </div>
          <div class="telemetry-stat">
            <div class="telemetry-stat__label">Lead Center</div>
            <div class="telemetry-stat__value">${escapeHtml(mission.center || 'NASA HQ')}</div>
          </div>
        </div>
        <div class="nasa-modal__prose">
          <p>${escapeHtml(mission.description)}</p>
          ${objectives ? `<h4 style="color:#fff;font-size:0.98rem;margin:16px 0 8px;">Scientific Objectives</h4><ul style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">${objectives}</ul>` : ''}
        </div>
        ${milestones ? `<h4 style="color:#fff;font-size:0.98rem;margin:16px 0 10px;">Key Milestones</h4><div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">${milestones}</div>` : ''}
        ${instruments ? `<h4 style="color:#fff;font-size:0.98rem;margin:16px 0 8px;">Key Instruments</h4><div class="nasa-modal__tags">${instruments}</div>` : ''}
      `
    });
  }

  /* --------------------------------------------------------------------------
     Quick Search Modal
     -------------------------------------------------------------------------- */
  function openSearchModal() {
    ensureModalRoot();
    const modal = document.getElementById('nasaSearchModal');
    const input = document.getElementById('globalQuickSearchInput');
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    renderQuickSearchResults('');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 60);
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('nasaSearchModal');
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 260);
  }

  function renderQuickSearchResults(query) {
    const container = document.getElementById('globalQuickSearchResults');
    if (!container || !window.NASAData) return;

    const q = query.trim().toLowerCase();
    const index = window.NASAData.getSearchIndex();
    const matches = (q
      ? index.filter((item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
        )
      : index.slice(0, 7));

    if (!matches.length) {
      container.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;padding:12px;">No NASA missions, articles, or pages matched "${escapeHtml(query)}".</p>`;
      return;
    }

    container.innerHTML = matches.slice(0, 8).map((item, idx) => `
      <button type="button" class="quick-search-item" data-search-idx="${idx}">
        <div>
          <div style="font-size:0.92rem;font-weight:600;color:#fff;">${escapeHtml(item.title)}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">${escapeHtml(item.subtitle)}</div>
        </div>
        <span class="quick-search-item__type">${escapeHtml(item.type)}</span>
      </button>
    `).join('');

    container.querySelectorAll('.quick-search-item').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const picked = matches[idx];
        closeSearchModal();
        if (picked.action === 'url') {
          window.location.href = picked.href;
        } else if (picked.action === 'article') {
          openArticleModal(picked.payload);
        } else if (picked.action === 'mission') {
          openMissionModal(picked.payload);
        } else if (picked.action === 'iss') {
          openIssLiveModal();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Mobile Drawer & Global Event Wiring
     -------------------------------------------------------------------------- */
  function initShellControls() {
    ensureModalRoot();

    const mobileBtn = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('is-open');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
      });
      mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('is-open');
          mobileBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    document.querySelectorAll('[data-open-search]').forEach((btn) => {
      btn.addEventListener('click', openSearchModal);
    });

    document.querySelectorAll('[data-share-page]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const shareUrl = window.location.href;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareUrl);
          }
          showToast('Portal Link Copied', 'Ready to share this NASA mission briefing.');
        } catch {
          showToast('NASA Portal', 'Share this mission link: ' + shareUrl);
        }
      });
    });

    const quickInput = document.getElementById('globalQuickSearchInput');
    if (quickInput) {
      quickInput.addEventListener('input', (e) => renderQuickSearchResults(e.target.value));
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) closeModal();
      if (e.target.closest('[data-search-close]')) closeSearchModal();
      if (e.target.closest('[data-open-iss]')) openIssLiveModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeSearchModal();
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
          mobileDrawer.classList.remove('is-open');
          if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
        }
      }
      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) &&
          document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearchModal();
      }
    });
  }

  window.NASAShell = {
    openModal,
    closeModal,
    openIssLiveModal,
    openArticleModal,
    openMissionModal,
    openSearchModal,
    showToast,
    escapeHtml
  };

  document.addEventListener('DOMContentLoaded', initShellControls);
})();
