// ============================================
// main.js — Team Site JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Header scroll effect ----
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Mobile nav drawer ----
  const hamburger = document.querySelector('.header__hamburger');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-drawer__overlay');

  const openDrawer = () => drawer?.classList.add('is-open');
  const closeDrawer = () => drawer?.classList.remove('is-open');

  hamburger?.addEventListener('click', openDrawer);
  overlay?.addEventListener('click', closeDrawer);
  document.querySelectorAll('.nav-drawer__link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.js-reveal');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerHeight = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- スライドショー ----
  const slides = document.querySelectorAll('.mission-slide');
  const indicators = document.querySelectorAll('.mission-indicator');
  if (slides.length > 0) {
    let current = 0;
    const goTo = (index) => {
      slides[current].classList.remove('is-active');
      indicators[current]?.classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      indicators[current]?.classList.add('is-active');
    };
    indicators.forEach((ind, i) => ind.addEventListener('click', () => goTo(i)));
    setInterval(() => goTo((current + 1) % slides.length), 5000);
  }

  // Reduced motion respect
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.js-reveal').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('is-visible');
    });
  }

});