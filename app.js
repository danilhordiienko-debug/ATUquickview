// ===============================
// 1. Smooth scroll + active nav + orange highlight
// ===============================

const navButtons = document.querySelectorAll('.top-nav button[data-scroll]');
const allSections = document.querySelectorAll('.section');

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-scroll');
    const el = document.querySelector(targetSelector);

    // активная кнопка
    navButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });

      // оранжевая подсветка секции
      allSections.forEach((sec) => sec.classList.remove('section-highlight'));
      el.classList.add('section-highlight');
      setTimeout(() => el.classList.remove('section-highlight'), 900);
    }
  });
});

// ===============================
// 2. Клик по карточке = открыть сайт в новой вкладке
//    (кроме кликов по кнопкам/ссылкам внутри)
// ===============================

document.querySelectorAll('.service-card').forEach((card) => {
  const url = card.getAttribute('data-url');

  card.addEventListener('click', (event) => {
    if (event.target.closest('.primary-btn') || event.target.closest('a')) {
      return; // внутри карточки нажали кнопку/ссылку — не трогаем
    }
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  });
});

// ===============================
// 3. Modal mini view для кнопок с data-frame-url
//    ДЕСКТОП: показываем модалку с iframe
//    МОБИЛКА (<768px): просто открываем сайт в новой вкладке
// ===============================

const overlay = document.getElementById('frameOverlay');
const iframe = document.getElementById('frameOverlayIframe');
const closeBtn = overlay ? overlay.querySelector('.close-btn') : null;

if (overlay && iframe && closeBtn) {
  // открыть mini-view / вкладку
  document.querySelectorAll('.primary-btn[data-frame-url]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = btn.getAttribute('data-frame-url');
      if (!url) return;

      // 📱 МОБИЛКА: без iframe, сразу новая вкладка
      if (window.innerWidth < 768) {
        window.open(url, '_blank', 'noopener');
        return;
      }

      // 💻 ДЕСКТОП: модальное окно с iframe
      iframe.src = url;
      overlay.classList.remove('hidden');
    });
  });

  // закрыть по крестику
  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    iframe.src = '';
  });

  // закрыть по клику по тёмному фону
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.add('hidden');
      iframe.src = '';
    }
  });
}
