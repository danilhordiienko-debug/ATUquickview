// ===============================
// 1. Smooth scroll + active nav + orange highlight
// ===============================

const navButtons = document.querySelectorAll('.top-nav button[data-scroll]');
const allSections = document.querySelectorAll('.section');

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-scroll');
    const el = document.querySelector(targetSelector);

    navButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });

      allSections.forEach((sec) => sec.classList.remove('section-highlight'));
      el.classList.add('section-highlight');
      setTimeout(() => el.classList.remove('section-highlight'), 900);
    }
  });
});

// ===============================
// 2. Клик по карточке = открыть сайт (кроме кнопок/ссылок внутри)
// ===============================

document.querySelectorAll('.service-card').forEach((card) => {
  const url = card.getAttribute('data-url');

  card.addEventListener('click', (event) => {
    if (event.target.closest('.primary-btn') || event.target.closest('a')) {
      return;
    }
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  });
});

// ===============================
// 3. MINI VIEW: всегда модалка с iframe
// ===============================

const overlay = document.getElementById('frameOverlay');
const iframe = document.getElementById('frameOverlayIframe');
const closeBtn = overlay ? overlay.querySelector('.close-btn') : null;

if (overlay && iframe && closeBtn) {
  document.querySelectorAll('.primary-btn[data-frame-url]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const url = btn.getAttribute('data-frame-url');
      if (!url) return;

      iframe.src = url;
      overlay.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    iframe.src = '';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.add('hidden');
      iframe.src = '';
    }
  });
}
