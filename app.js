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
// 3. MINI VIEW: десктоп = модалка, мобилка = новая вкладка
// ===============================

const overlay = document.getElementById('frameOverlay');
const iframe = document.getElementById('frameOverlayIframe');
const closeBtn = overlay ? overlay.querySelector('.close-btn') : null;

// универсальный селектор: и data-frame-url, и старый data-frame
const miniViewButtons = document.querySelectorAll(
  '.primary-btn[data-frame-url], .primary-btn[data-frame]'
);

if (miniViewButtons.length && (overlay && iframe && closeBtn)) {
  miniViewButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const url =
        btn.getAttribute('data-frame-url') || btn.getAttribute('data-frame');
      if (!url) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // 📱 телефоны — просто открыть полноценный сайт
        window.open(url, '_blank', 'noopener');
        return;
      }

      // 💻 десктоп — модальное окно с iframe
      iframe.src = url;
      overlay.classList.remove('hidden');
    });
  });

  // закрыть по крестику
  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    iframe.src = '';
  });

  // закрыть по клику по фону
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.add('hidden');
      iframe.src = '';
    }
  });
} else {
  // если модалки нет, хотя бы открываем ссылки
  miniViewButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url =
        btn.getAttribute('data-frame-url') || btn.getAttribute('data-frame');
      if (!url) return;
      window.open(url, '_blank', 'noopener');
    });
  });
}
