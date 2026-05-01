// KERNL pitch deck — minimal slide navigation
(() => {
  const deck = document.getElementById('deck');
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const total = slides.length;
  const progress = document.getElementById('progress');
  const curIdxEl = document.getElementById('curIdx');
  const totalEl = document.getElementById('total');
  totalEl.textContent = total;

  let i = 0;

  const render = () => {
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
    curIdxEl.textContent = i + 1;
    progress.style.width = `${((i + 1) / total) * 100}%`;
    const slide = slides[i];
    document.body.style.background = getComputedStyle(slide).backgroundColor;
    location.hash = `s${i + 1}`;
  };

  const go = (n) => {
    const next = Math.max(0, Math.min(total - 1, n));
    if (next === i) return;
    i = next;
    render();
  };

  document.getElementById('next').addEventListener('click', () => go(i + 1));
  document.getElementById('prev').addEventListener('click', () => go(i - 1));

  document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(i + 1); }
    if (['ArrowLeft', 'PageUp'].includes(e.key))         { e.preventDefault(); go(i - 1); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End')  { e.preventDefault(); go(total - 1); }
  });

  // Click to advance (but not on links / buttons)
  deck.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, select, textarea')) return;
    go(i + 1);
  });

  // Touch swipe
  let startX = 0;
  deck.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  });

  // Allow deep-link via hash (e.g. #s5)
  const hashIdx = parseInt((location.hash.match(/^#s(\d+)$/) || [])[1], 10);
  if (Number.isFinite(hashIdx) && hashIdx >= 1 && hashIdx <= total) i = hashIdx - 1;

  render();
})();
