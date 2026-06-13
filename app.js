// Little Vietnam Colombo — interactions

// Intro overlay fade-out
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if (intro) setTimeout(() => intro.classList.add('done'), 1500);
});

// Nav scroll state + mobile toggle
const nav = document.querySelector('header.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const burger = nav.querySelector('.burger');
  if (burger) burger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open')));
}

// Rolling hero
(function () {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { slides[0].classList.add('active'); return; }
  let i = 0;
  slides[0].classList.add('active');
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 6000);
})();

// Scroll reveal
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(e => e.classList.add('in')); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
})();

// Year stamp
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// AJAX contact form -> FormSubmit, inline success
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const res = await fetch('https://formsubmit.co/ajax/littlevietnam.nz@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('Network');
      form.style.display = 'none';
      if (success) success.classList.add('show');
    } catch (err) {
      btn.textContent = original; btn.disabled = false;
      alert('Sorry — something went wrong sending your enquiry. Please call us on 022 188 7519.');
    }
  });
})();
