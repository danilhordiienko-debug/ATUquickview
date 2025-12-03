// ===============================
// 1. Smooth scroll + active nav + orange highlight
// ===============================

const navButtons = document.querySelectorAll('.top-nav button[data-scroll]');
const allSections = document.querySelectorAll('.section');

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-scroll');
    const el = document.querySelector(targetSelector);

    // active button
    navButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });

      // orange glow
      allSections.forEach((sec) => sec.classList.remove('section-highlight'));
      el.classList.add('section-highlight');
      setTimeout(() => el.classList.remove('section-highlight'), 900);
    }
  });
});

// ===============================
// 2. Click on card = open official site (except buttons/links)
// ===============================

document.querySelectorAll('.service-card').forEach((card) => {
  const url = card.getAttribute('data-url');

  card.addEventListener('click', (event) => {
    // don't trigger when clicking on buttons or <a>
    if (event.target.closest('.primary-btn') || event.target.closest('a')) {
      return;
    }
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  });
});

// ===============================
// 3. Modal mini view for buttons with data-frame-url
// ===============================

const overlay = document.getElementById('frameOverlay');
const iframe = document.getElementById('frameOverlayIframe');
const closeBtn = overlay ? overlay.querySelector('.close-btn') : null;

if (overlay && iframe && closeBtn) {
  // open modal
  document.querySelectorAll('.primary-btn[data-frame-url]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = btn.getAttribute('data-frame-url');
      if (!url) return;

      iframe.src = url;
      overlay.classList.remove('hidden');
    });
  });

  // close by button
  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    iframe.src = '';
  });

  // close by clicking on dark background
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.add('hidden');
      iframe.src = '';
    }
  });
}
