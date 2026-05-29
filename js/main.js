// Nav scroll effect
(function() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Lightbox
(function() {
  const items = document.querySelectorAll('.photo-item');
  if (!items.length) return;

  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const lbImg = lb.querySelector('.lightbox-img');
  const lbCap = lb.querySelector('.lightbox-caption');
  let current = 0;
  const photos = Array.from(items).map(el => ({
    src: el.dataset.src,
    caption: el.dataset.caption || ''
  }));

  function open(i) {
    current = i;
    lbImg.src = photos[i].src;
    lbCap.textContent = photos[i].caption;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { open((current - 1 + photos.length) % photos.length); }
  function next() { open((current + 1) % photos.length); }

  items.forEach((el, i) => el.addEventListener('click', () => open(i)));
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
