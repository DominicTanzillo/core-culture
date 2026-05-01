// KERNL — interactivity
(() => {
  // Sticky nav shadow on scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.getElementById('mobileMenu');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      mobile.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobile.classList.remove('is-open');
      mobile.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Reveal on scroll
  const targets = document.querySelectorAll(
    '.section-head, .card, .pillar, .polaroid, .quote, .bundle, .stockists__logos, .newsletter__inner, .hero__copy, .hero__art'
  );
  targets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => io.observe(el));

  // Newsletter — fake submit handler (stand-in for real backend)
  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');
  if (form && msg) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      const ok = /.+@.+\..+/.test(email);
      if (!ok) {
        msg.textContent = "that doesn't look like an email — try again?";
        msg.style.color = 'var(--coral)';
        return;
      }
      msg.textContent = "✓ you're in. check your inbox in a sec.";
      msg.style.color = 'var(--moss)';
      form.reset();
    });
  }

  // Add-to-bag micro feedback
  document.querySelectorAll('.card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = '✓ Added';
      btn.style.background = 'var(--moss)';
      btn.style.color = 'var(--cream-light)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
      }, 1400);
    });
  });
})();
