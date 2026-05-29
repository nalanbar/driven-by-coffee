// Theme toggle
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  function update() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '☀' : '☾';
  }

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    update();
  });

  update();
})();

// Nav scroll effect
(function() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Lightbox (event delegation — works with dynamically added photos)
(function() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const lbImg = lb.querySelector('.lightbox-img');
  const lbCap = lb.querySelector('.lightbox-caption');
  let current = 0;

  function getItems() {
    return Array.from(document.querySelectorAll('.photo-item'));
  }

  function open(i) {
    const items = getItems();
    if (!items.length) return;
    current = i;
    lbImg.src = items[i].dataset.src;
    lbCap.textContent = items[i].dataset.caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { const n = getItems().length; if (n) open((current - 1 + n) % n); }
  function next() { const n = getItems().length; if (n) open((current + 1) % n); }

  document.addEventListener('click', e => {
    const item = e.target.closest('.photo-item');
    if (!item) return;
    const items = getItems();
    const idx = items.indexOf(item);
    if (idx >= 0) open(idx);
  });

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', prev);
  lb.querySelector('.lightbox-nav.next').addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
